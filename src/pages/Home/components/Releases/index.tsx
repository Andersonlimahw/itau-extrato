import { ITabItem, Tabs } from "../../../../commons/components/Tabs"
import { ResponseType, useCustomRequestHook } from "../../../../commons/hooks/useCustomRequestHook"
import { CategoryModel } from "../../model/category";
import { ReleaseModel } from "../../model/release"
import { useState } from 'react';

// Lançamentos
export const Releases = () => {
    // constants:
    const API_BASE_URL = 'http://localhost:3200/api/v1';
    const CATEGORY_ENDPOINT = 'categoria';
    const RELEASE_ENDPOINT = 'lancamento';
    const API_CATEGORY_URL = `${API_BASE_URL}/${CATEGORY_ENDPOINT}`;
    const API_RELEASE_URL = `${API_BASE_URL}/${RELEASE_ENDPOINT}`;

    // hooks:
    const {
        statusType: categoryStatusType,
        response: categories
    } = useCustomRequestHook({ url: API_CATEGORY_URL });

    const {
        statusType: releaseStatusType,
        response: releases
    } = useCustomRequestHook({ url: API_RELEASE_URL });

    // State: 
    const [selectedCategory, setSelectedCategory] = useState<CategoryModel | ITabItem>();

    const handleClick = (item : ITabItem) => {
        console.log('[selectedCategory] => ', selectedCategory);
        setSelectedCategory(item);
    };

    const filteredReleases = releases?.filter((x : ReleaseModel) => x.idCategoria === selectedCategory?.id);
    
    return (
        <>
            {
                categoryStatusType === ResponseType.loading ? (<div>Carregando categorias...</div>) : 
                (<Tabs tabs={categories} handleClick={handleClick} />)
            }

            {
                releaseStatusType === ResponseType.loading ? (<div>Carregando lançamentos...</div>) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Descrição</th>
                                <th>Valor</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                selectedCategory && filteredReleases ? 
                                filteredReleases.map((release: ReleaseModel) => (
                                    <tr key={release.id}>
                                        <td>{release.description}</td>
                                        {/* TODO: helper formatar moeda */}
                                        <td>{release.value}</td>
                                        <td>{release.date.toLocaleString()}</td>
                                    </tr>
                                )) :

                                releases.map((release: ReleaseModel) => (
                                    <tr key={release.id}>
                                        <td>{release.description}</td>
                                        {/* TODO: helper formatar moeda */}
                                        <td>{release.value}</td>
                                        <td>{release.date.toLocaleString()}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
            }

        </>
    )
}