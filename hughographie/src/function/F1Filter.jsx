import { useState } from "react";
import Button from "../elements/Button";

const F1Filter = ({ arrayToFilter, filterTarget, children }) => {
    const [activeFilter, setActiveFilter] = useState(null);

    const filters = [
        ...new Set(arrayToFilter?.map(item => item.content[filterTarget]))
    ];

    const filteredItems = activeFilter
        ? arrayToFilter?.filter(
            item => item.content[filterTarget] === activeFilter
        )
        : arrayToFilter;

    return (
        <>
            <div className="f1-filter">
                <Button onClick={() => setActiveFilter(null)} className={`${activeFilter === null ? 'is-active' : ''}`}>
                    All
                </Button>

                {filters.map((filter, index) => (
                    <Button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`${activeFilter === filter ? 'is-active' : ''}`}
                    >
                        {filter}
                    </Button>
                ))}
            </div>

            {children(filteredItems)}
        </>
    );
};

export default F1Filter;