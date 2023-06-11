import "./contracts-main-component.css";
import { ContractType } from "../../../DATASTORE/data-types/main.data.types/contract-data-types";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { MainInfoPannel } from "../../info-panel/main-info-panel-component";
import { SummaryCustomerOrdersAmountType } from "../../../DATASTORE/data-types/main.data.types/customer-data-types";
import { OtherActionContexts } from "../../../utility/contexts/action.context";
import { summary_ContractsAmount } from "../../../DATASTORE/side-functions/side-functions";
import { DELETE_ORDER_ON_CONTRACT } from "../../../DATASTORE/manage-contract/order/delete-order";
import { MainContext } from "../../../utility/contexts/main.context";
import { modifyContract } from "../../../DATASTORE/data-types/man.data.reducers/contracts-reducer/contracts.data.actions";
import { RecordOrders } from "../record-order/record-contract-component";
import { HeaderTitleColumn } from "../../header-title-column/header-title-column-component";
import { AvailabilityContext } from "../../../utility/contexts/contacts-data/contacts-data-context";

type ContractsMainType = { contracts_main: ContractType[] };

export const ContractsMain = ({ contracts_main }: ContractsMainType): JSX.Element => {
    const [headerItem, SetHeaderItem] = useState<string[]>(["Customers"]);
    const searchValue = useRef<HTMLInputElement>(null);

    const { showOrders, SetShowOrders, selectedCustomerData, SetSelectedCustomerType } = useContext(OtherActionContexts);
    const { setOpenModifyModal } = useContext(AvailabilityContext);
    const { contracts } = useContext(MainContext);
    const { ContractsDataDispatch } = contracts;

    const [customersData, SetCustomersData] = useState<SummaryCustomerOrdersAmountType[] | []>([]);
    const [filteredCustomersData, SetFilteredCustomersData] = useState<SummaryCustomerOrdersAmountType[] | []>([]);

    useEffect(() => {
        SetCustomersData(summary_ContractsAmount(contracts_main));
        return () => {};
    }, [contracts_main]);

    // useEffect(() => {
    //   console.log(filteredCustomersData)
    // }, [filteredCustomersData])

    const FilterData = (searchFor: string): SummaryCustomerOrdersAmountType[] => {
        const filteredTemp = customersData.filter(
            (customer) =>
                customer.contract.id.toLocaleUpperCase().includes(searchFor.toLocaleUpperCase()) ||
                customer.contract.customer.companyName.toLocaleUpperCase().includes(searchFor.toLocaleUpperCase())
        );

        return filteredTemp;
    };

    const handle_Search = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const target = event.target;
        let searchForText = "";
        Object.values(target).forEach((value) => {
            const searchInput = value as HTMLInputElement;
            if (searchInput.type === "text") searchForText = searchInput.value;
        });
        if (searchForText !== "") SetFilteredCustomersData(FilterData(searchForText));
    };
    const handle_Reset_Search = () => {
        SetFilteredCustomersData([]);
        const current = searchValue.current;
        if (current) current.value = "";
    };

    const handle_NewContract = () => setOpenModifyModal((state) => ({ ...state, isOpenRecordContract: true }));

    const handle_DELETE_order = (contractID: string, order_id: string) => {
        const updatedContract = DELETE_ORDER_ON_CONTRACT(contracts_main, contractID, order_id);
        if (updatedContract) ContractsDataDispatch(modifyContract(updatedContract));
    };

    const handle_SET_SELECTED_CUSTOMER = (products_id: string, order_id: string, contract: ContractType) => {
        const contract_deep_copy = JSON.parse(JSON.stringify(contract));
        setSelectedCustomer(products_id, order_id, contract_deep_copy);
    };

    const handle_MODIFY_PRODUCT = async (products_id: string, order_id: string, contract: ContractType) => {
        const contract_deep_copy = await JSON.parse(JSON.stringify(contract));
        setSelectedCustomer(products_id, order_id, contract_deep_copy);
    };

    const setSelectedCustomer = (products_id: string, order_id: string, contract: ContractType) => {
        const summarryOrder_ForSelectedCustomer = customersData.find((customer) => customer.contract.id === contract.id);
        SetSelectedCustomerType((state) => ({ ...state, customer: summarryOrder_ForSelectedCustomer, order_id: order_id, products_id: products_id }));
    };

    return (
        <div className="contracts-container">
            <HeaderTitleColumn
                button_title="add contract"
                headerItem={headerItem}
                useRef={searchValue}
                submit_Search={handle_Search}
                reset={handle_Reset_Search}
                handleNewItem={handle_NewContract}
            />
            <div className="contracts-main-container">
                <div>
                    {customersData && (
                        <>
                            {filteredCustomersData.length > 0 ? (
                                <>
                                    {filteredCustomersData.map((customersDat, index) => {
                                        return (
                                            <MainInfoPannel
                                                customerIndex={index}
                                                key={`${customersDat}-${index}`}
                                                customerData={customersDat}
                                                handleDelete={handle_DELETE_order}
                                                handleModifyProduct={handle_MODIFY_PRODUCT}
                                                handleSetSelectedCustomer={handle_SET_SELECTED_CUSTOMER}
                                            />
                                        );
                                    })}
                                </>
                            ) : (
                                <>
                                    {customersData.map((customersDat, index) => {
                                        return (
                                            <MainInfoPannel
                                                customerIndex={index}
                                                key={`${customersDat}-${index}`}
                                                customerData={customersDat}
                                                handleDelete={handle_DELETE_order}
                                                handleModifyProduct={handle_MODIFY_PRODUCT}
                                                handleSetSelectedCustomer={handle_SET_SELECTED_CUSTOMER}
                                            />
                                        );
                                    })}
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>

            {selectedCustomerData.customer && <RecordOrders />}
        </div>
    );
};
