import { useState } from "react";
import Button from "../elements/Button";

const F1Filter = ({ arrayToFilter, filterTarget, children }) => {
    const [activeFilter, setActiveFilter] = useState(null);
    const [showMobileFilters, setShowMobileFilters] = useState(false)

    const filters = [
        ...new Set(arrayToFilter?.map(item => item.content[filterTarget]))
    ];

    const filteredItems = activeFilter
        ? arrayToFilter?.filter(
            item => item.content[filterTarget] === activeFilter
        )
        : arrayToFilter;

    const Filters = ({ className }) => {
        return (
            <>
                <Button onClick={() => setActiveFilter(null)} className={`${className} ${activeFilter === null ? 'is-active' : ''}`}>
                    All
                </Button>
                {filters.map((filter, index) => (
                    <Button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`${className} ${activeFilter === filter ? 'is-active' : ''}`}
                    >
                        {filter}
                    </Button>
                ))}
            </>
        )
    }

    return (
        <>
            <div className="f1-filter">
                <div className="desktop-filters">
                    <Button className={`mobile-filter-button ${showMobileFilters ? 'active' : ''}`} onClick={() => setShowMobileFilters(!showMobileFilters)}>
                        Filters
                    </Button>
                    <Filters />
                </div>
                <div className={`mobile-filters ${showMobileFilters ? 'visible' : 'hidden'}`}>
                    <Filters className="mobile-filter" />
                </div>
            </div>

            {children(filteredItems)}
        </>
    );
};

export default F1Filter;