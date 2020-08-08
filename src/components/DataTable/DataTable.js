/* eslint-disable no-script-url */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable implicit-arrow-linebreak */
import React, { useState, useEffect, useCallback } from "react";
import get from "lodash/get";
import ReactPaginate from "react-paginate";
import "./DataTable.scss";
import Input from "../../components/Input/Input";
import { debounce } from "lodash";
import Tooltip from '../Tooltip/Tooltip';
const maxPageNumberShow = 5;

const DataTable = ({
    column = [],
    data = [],
    headerStyle = {},
    thStyle = {},
    headerTitle = "",
    maxSinglePageItems = 50,
    topPaginationRequired = false,
    bottomPaginationRequired = true,
    onPageChange,
    initPageNumber = 0,
    style = {},
    totalCount = 0,
    onRowClick = () => {},
    blurTable = false,
    showSearch = false,
    onSearch = () => {},
    searchPlaceholder="Search",
    showSearchTooltip = false,
    tooltipOptions = {
        title:"",
        desc:""
    }
}) => {
    const [singlePageItemCount, setSinglePageItemCount] = useState(
        maxSinglePageItems
    );
    const [search, setsearch] = useState('')
    const [currentPage, setCurrentPage] = useState(
        data.length > 0 ? initPageNumber : 0
    );
    const [inputData, setInputData] = useState(data);
    const [totalPages, settotalPages] = useState(
        totalCount
            ? Math.ceil(totalCount / maxSinglePageItems)
            : Math.ceil(inputData.length / maxSinglePageItems)
    );
    let debouncedFn = null
    const columnOrder = [];
    const columnFormatter = {};
    // const totalPages = totalCount ? Math.ceil(totalCount / singlePageItemCount) : Math.ceil(inputData.length / singlePageItemCount);
    useEffect(() => {
        settotalPages(
            totalCount
                ? Math.ceil(totalCount / maxSinglePageItems)
                : Math.ceil(inputData.length / maxSinglePageItems)
        );
    }, [totalCount, maxSinglePageItems]);
    useEffect(() => {
        setCurrentPage(initPageNumber);
    }, [initPageNumber]);

    useEffect(() => {
        setInputData(data);
    }, [data]);

    useEffect(() => {
        setSinglePageItemCount(singlePageItemCount);
    }, [maxSinglePageItems]);

    column.forEach((columnMetaData) => {
        if (typeof columnMetaData === "string") {
            columnOrder.push(columnMetaData);
            columnFormatter[columnMetaData] = {
                label: columnMetaData,
                format: (value) => value,
            };
        }
        const label =
            get(columnMetaData, "label") || get(columnMetaData, "id") || "";
        if (!label) return;
        const id = get(columnMetaData, "id") || label.toLowerCase();
        columnOrder.push(id);
        const defaultFormat = (val) => val;
        const JSXFormat = get(columnMetaData, "JSXFormat") || defaultFormat;
        columnFormatter[id] = {
            label,
            format: (value, rowData) => JSXFormat(value, rowData),
        };
    });

    if (column.length === 0 && inputData.length > 0) {
        column = Object.keys(inputData[0]);
    }

    const getNavigation = () => (
        <div className="datatable-footer-page-nav">
            <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={totalPages}
                // initialPage={currentPage}
                forcePage={currentPage}
                marginPagesDisplayed={2}
                pageRangeDisplayed={maxPageNumberShow}
                disableInitialCallback
                onPageChange={({ selected }) => {
                    if (typeof onPageChange === "function") {
                        onPageChange(selected);
                    }
                    setCurrentPage(selected);
                }}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
            />
        </div>
    );

    return (
        <div
            style={style}
            className="data-table"
            style={{ paddingTop: topPaginationRequired ? 0 : 0 }}
        >
            {inputData.length > 0 && topPaginationRequired && getNavigation()}

            <div
                className={`flex ${
                    headerTitle ? "space-between" : "flex-end"
                } `}
                style={{ marginBottom: showSearch? 30:0 }}
            >
                {headerTitle && (
                    <div className="table-header" style={headerStyle}>
                        {headerTitle}
                    </div>
                )}

                <div>
                    {showSearch ? 
                    <React.Fragment>
                        <Input
                            style={{ minWidth: 250 }}
                            placeholder={searchPlaceholder}
                            type="text"
                            onChange={(event) => {
                                event.persist();
                                setsearch(event.target.value)
                                if (!debouncedFn) {
                                    debouncedFn = _.debounce(onSearch, 300);
                                }
                                
                                debouncedFn(event);
                                
                            }}
                            bordered={true}
                        />
                        {/* <div className="margin-left-sm flex">
                            <Tooltip description=""/>
                        </div> */}
                    </React.Fragment>  : null}
                    
                </div>
            </div>
            {inputData.length === 0 ? (
                <div className="no-data-available">{`No Data Available  ${search? `for search "${search}"`:''} `}</div>
            ) : (
                <table
                    cellSpacing="0"
                    className={`table-striped table-bordered table-hover table ${
                        blurTable ? "blur" : ""
                    }`}
                >
                    <thead>
                        <tr>
                            {Object.keys(columnFormatter).map((key) => (
                                <th style={thStyle} key={key}>
                                    {columnFormatter[key].label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* currentPage * singlePageItemCount,
                                (currentPage + 1) * singlePageItemCount */}
                        {inputData.slice().map((rowData, index) => (
                            <tr
                                key={rowData._id || index}
                                onClick={() => {
                                    !blurTable && onRowClick(rowData, index);
                                }}
                            >
                                {columnOrder.map((key) => {
                                    if (columnFormatter[key]) {
                                        return (
                                            <td key={key + index}>
                                                {columnFormatter[key].format(
                                                    rowData[key],
                                                    rowData
                                                )}
                                            </td>
                                        );
                                    }
                                    return null;
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {inputData.length > 0 &&
                bottomPaginationRequired &&
                getNavigation()}
        </div>
    );
};

export default DataTable;
