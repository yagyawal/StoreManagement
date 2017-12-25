const defaultState = {
    boxProp: {
        title: "Inventory Summary",
        minimizeTool: true,
        closeTool: true
    },
    formFields: [
        {id: 'InventoryTypeId', name: "InventoryType", label: "Inventory  Type", type: "text"},
        {id: 'InventoryDesc', name: "InventoryDesc", label: "Description", type: "checkbox"},
        {id: 'TotalInventory', name: "TotalInventory", label: "Total", type: "date"},
    ]
}
const InvSummary = (state = defaultState, action) => {
    switch (action.type) {
        case 'FETCH_MENU':
            return state;
        default:
            return state
    }
}

export default InvSummary;