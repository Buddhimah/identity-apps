/**
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { TestableComponentInterface } from "@wso2is/core/models";
import React, { FunctionComponent, ReactElement } from "react";
import { Checkbox, Table, TableProps } from "semantic-ui-react";
import { EmptyPlaceholder } from "../placeholder";

interface TransferListItemInterface {
    itemName: string;
    itemId: string;
}

/**
 * Proptypes transfer list component.
 */
export interface TransferListPropsInterface extends TableProps, TestableComponentInterface {
    listValues?: TransferListItemInterface[] | string[];
    listHeaders?: any;
    listType: "selected" | "unselected";
    isListEmpty: boolean;
    handleHeaderCheckboxChange: () => void;
    isHeaderCheckboxChecked: boolean;
}

/**
 * Transfer list component.
 *
 * @param {TransferListPropsInterface} props - Props injected to the component.
 * @return {React.ReactElement}
 */
export const TransferList: FunctionComponent<TransferListPropsInterface> = (
    props: TransferListPropsInterface
): ReactElement => {

    const {
        children,
        listHeaders,
        isListEmpty,
        handleHeaderCheckboxChange,
        isHeaderCheckboxChecked,
        [ "data-testid" ]: testId
    } = props;

    return (
        <>
            {
                !isListEmpty ? (
                <Table>
                    {
                        listHeaders instanceof Array && (
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>
                                        <Checkbox
                                            data-testid={ testId }
                                            checked={ isHeaderCheckboxChecked }
                                            onChange={ handleHeaderCheckboxChange }
                                        />
                                    </Table.HeaderCell>
                                    {
                                        listHeaders?.map((header, index) => {
                                            return (
                                                <Table.HeaderCell
                                                    key={ index }><strong>{ header }</strong></Table.HeaderCell>
                                            )
                                        })
                                    }
                                </Table.Row>
                            </Table.Header>
                        )
                    }
                    { children }
                </Table>
                ) : (
                    <div className={ "empty-placeholder-center" }>
                        <EmptyPlaceholder
                            data-testid={ `${ testId }-placeholder` }
                            subtitle={ [ "There are no items in this list at the moment." ] }
                        />
                    </div>
                )
            }
        </>
    );
};

/**
 * Default props for the transfer list component.
 */
TransferList.defaultProps = {
    "data-testid": "transfer-list"
};