/**
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the 'License'); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * 'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { AlertLevels, TestableComponentInterface } from "@wso2is/core/models";
import { addAlert } from "@wso2is/core/store";
import { Heading } from "@wso2is/react-components";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Divider, Grid } from "semantic-ui-react";
import { getRolesList } from "../../../../api";
import { RoleListInterface, RoleMappingInterface, RolesInterface } from "../../../../models";
import { DynamicField } from "../../../shared"

interface RoleMappingPropsInterface extends TestableComponentInterface {
    /**
     *  Trigger submission or not
     */
    submitState: boolean;
    /**
     *  function to be called on submission
     * @param roleMappings
     */
    onSubmit?: (roleMappings: RoleMappingInterface[]) => void;
    /**
     * Initial values of the role mapping
     */
    initialMappings: RoleMappingInterface[];
    /**
     * Make the form read only.
     */
    readOnly?: boolean;
}

/**
 * Role mapping component.
 *
 * @param {RoleMappingPropsInterface} props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const RoleMapping: FunctionComponent<RoleMappingPropsInterface> = (
    props: RoleMappingPropsInterface
): React.ReactElement => {

    const {
        onSubmit,
        submitState,
        initialMappings,
        readOnly,
        [ "data-testid" ]: testId
    } = props;

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const [roleList, setRoleList] = useState<RolesInterface[]>();

    /**
     * Filter out Application related and Internal roles
     */
    const getFilteredRoles = () => {
        const filterRole: RolesInterface[] = roleList.filter(
            (role) => {
                return !(role.displayName.includes("Application/") || role.displayName.includes("Internal/"))
            });

        return filterRole.map(role => {
            return {
                id: role.displayName,
                value: role.displayName
            }
        });
    };

    useEffect(() => {
        getRolesList(null)
            .then((response) => {
                if (response.status === 200) {
                    const allRole: RoleListInterface = response.data;
                    setRoleList(allRole.Resources);
                }
            })
            .catch(() => {
                dispatch(addAlert({
                    description: t("devPortal:components.roles.notifications.fetchRoles.genericError.description"),
                    level: AlertLevels.ERROR,
                    message: t("devPortal:components.roles.notifications.fetchRoles.genericError.message")
                }));
            });
    }, [initialMappings]);

    return (
        <>
            <Grid.Row columns={ 2 }>
                <Grid.Column mobile={ 16 } tablet={ 16 } computer={ 10 }>
                    <Divider/>
                    <Divider hidden/>
                </Grid.Column>
                <Grid.Column mobile={ 16 } tablet={ 16 } computer={ 8 }>
                    <Heading as="h5">
                        { t("devPortal:components.applications.edit.sections.attributes.roleMapping.heading") }
                    </Heading>
                    <DynamicField
                        data={
                            initialMappings ?
                                initialMappings.map(mapping => {
                                    return {
                                        key: mapping.localRole,
                                        value: mapping.applicationRole
                                    }
                                }) : []
                        }
                        keyType="dropdown"
                        keyData={ roleList ? getFilteredRoles() : [] }
                        keyName={
                            t("devPortal:components.applications.edit.sections.attributes.forms.fields.dynamic" +
                                ".localRole.label")
                        }
                        valueName={
                            t("devPortal:components.applications.edit.sections.attributes.forms.fields.dynamic" +
                                ".applicationRole.label")
                        }
                        keyRequiredMessage={
                            t("devPortal:components.applications.edit.sections.attributes.forms.fields.dynamic" +
                                ".localRole.validations.empty")
                        }
                        valueRequiredErrorMessage={
                            t("devPortal:components.applications.edit.sections.attributes.forms.fields.dynamic" +
                                ".applicationRole.validations.empty")
                        }
                        duplicateKeyErrorMsg={
                            t("devPortal:components.applications.edit.sections.attributes.forms.fields.dynamic" +
                                ".applicationRole.validations.duplicate")
                        }
                        submit={ submitState }
                        update={ (data) => {
                            if (data.length > 0) {
                                const finalData: RoleMappingInterface[] = data.map(mapping => {
                                    return {
                                        applicationRole: mapping.value,
                                        localRole: mapping.key
                                    }
                                });
                                onSubmit(finalData);
                            } else {
                                onSubmit([]);
                            }
                        } }
                        readOnly={ readOnly }
                        data-testid={ `${ testId }-dynamic-field` }
                    />
                </Grid.Column>
            </Grid.Row>
        </>
    )
};

/**
 * Default props for the application role mapping component.
 */
RoleMapping.defaultProps = {
    "data-testid": "application-role-mapping"
};