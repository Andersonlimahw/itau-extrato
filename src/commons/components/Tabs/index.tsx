export interface ITabItem { 
    id: string;
    name: string;
    active?: boolean;
}

export interface ITabProps { 
    tabs: ITabItem[];
    handleClick: any;
}

import './Tabs.css';

export const Tabs = ({ tabs, handleClick } : ITabProps) => {
    return(
        <div className='container nowrap'>
            {
                tabs.map((tab : ITabItem) =>  (
                    <div className={`item ${tab.active && 'active'}`} key={tab.id} onClick={() => handleClick(tab)}>
                        {tab.name}
                    </div>
                ))
            }
        </div>
    )
}