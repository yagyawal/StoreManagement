const defaultState = {
    fetching: false,
    error: null,
    boxProp: {
        title: "Inventory Summary",
        minimizeTool: true,
        closeTool: true
    },
    tableDetail: {
        width: 600,
        height: 550,
        columns: [
            {key: 'inventoryTypeId', name: 'Inventory Code', resizable: true, width: 200, type: 'text'},
            {
                key: 'inventoryType',
                name: 'Inventory',
                resizable: true,
                width: 200,
                type: 'text',
                flexGrow: 1,
                fixedRight: true
            },
            {key: 'availableCount', name: 'Total Available', width: 200, type: 'number'}
        ],
        rowCount: 0,
        rows: []
    },
    formFields: [
        {id: 'InventoryTypeId', name: "InventoryType", label: "Inventory  Type", type: "text"},
        {id: 'InventoryDesc', name: "InventoryDesc", label: "Description", type: "checkbox"},
        {id: 'TotalInventory', name: "TotalInventory", label: "Total", type: "date"},
    ],

}
const InvSummary = (state = defaultState, action) => {
    switch (action.type) {
        case 'FETCH_INVENTORY_SUMMARY_PENDING':
            return {...state, fetching: true, error: null};
        case 'FETCH_INVENTORY_SUMMARY_REJECTED':
            return {...state, fetching: true, error: action.payload};
        case 'FETCH_INVENTORY_SUMMARY_FULFILLED':
            return {...state, fetching: false, tableDetail: {...state.tableDetail, rows: action.payload.data,rowCount:action.payload.data.length}};
        default:
            return state
    }
}

export default InvSummary;