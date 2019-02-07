import React from 'react';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
} from 'react-redux';
import { RouteProps } from 'react-router';
import {
    Layout,
    MessageAlert,
    UserData,
} from '../../components';
import {
    addNewLabel,
    editLabel,
    AppState,
    changeUserState,
    changeUserRole,
    changeUserOTP,
    deleteLabel,
    getUserData,
    logout,
    selectUserData,
    selectAddLabelError,
    selectDeleteLabelError,
    selectEditLabelError,
    selectOTPError,
    selectRoleError,
    selectStateError,
} from '../../modules';
import { select } from 'redux-saga/effects';

interface ReduxProps {
    userData: any;
    errorAddLabel?: string;
    errorDeleteLabel?: string;
    errorEditLabel?: string;
    errorOTP?: string;
    errorRole?: string;
    errorState?: string;
}

interface DispatchProps {
    addNewLabel: typeof addNewLabel;
    editLabel: typeof editLabel;
    changeUserState: typeof changeUserState;
    changeUserRole: typeof changeUserRole;
    changeUserOTP: typeof changeUserOTP;
    deleteLabel: typeof deleteLabel;
    getUserData: typeof getUserData;
    logout: typeof logout;
}

interface OwnProps {
    match: any;
}

interface UserInfoState {
    openAddLabelModal: boolean;
    openEditLabelModal: boolean;
    nameLabel: string;
    valueLabel: string;
    scopeLabel: string;
    error: string;
    showMessage: boolean;
}

type Props = ReduxProps & DispatchProps & RouteProps & OwnProps;

class UserInfoScreen extends React.Component<Props, UserInfoState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            openAddLabelModal: false,
            openEditLabelModal: false,
            nameLabel: '',
            valueLabel: '',
            scopeLabel: 'public',
            error: '',
            showMessage: false,
        };
    }

    public componentDidMount() {
        this.props.getUserData({uid: this.props.match.params.uid});
    }

    public componentWillReceiveProps(next: Props) {
        this.setError(next.errorAddLabel, this.props.errorAddLabel);
        this.setError(next.errorEditLabel, this.props.errorEditLabel);
        this.setError(next.errorDeleteLabel, this.props.errorDeleteLabel);
        this.setError(next.errorOTP, this.props.errorOTP);
        this.setError(next.errorRole, this.props.errorRole);
        this.setError(next.errorState, this.props.errorState);
    }

    public render() {
        const {
            openAddLabelModal,
            openEditLabelModal,
            nameLabel,
            valueLabel,
            scopeLabel,
            error,
            showMessage,
        } = this.state;

        return (
            <Layout logout={this.userLogout}>
                { this.props.userData
                    ? (<UserData
                            addNewLabel={this.addLabel}
                            editLabel={this.editLabel}
                            changeLabelName={this.changeNameForNewLabel}
                            changeLabelScope={this.changeScopeForNewLabel}
                            changeLabelValue={this.changeValueForNewLabel}
                            changeState={this.changeState}
                            changeRole={this.changeRole}
                            changeOTP={this.changeOTP}
                            closeModal={this.handleCloseModal}
                            deleteUserLabel={this.deleteLabel}
                            newLabelName={nameLabel}
                            newLabelScope={scopeLabel}
                            newLabelValue={valueLabel}
                            isAddLabelModalOpened={openAddLabelModal}
                            isEditLabelModalOpened={openEditLabelModal}
                            openAddLabelModal={this.handleOpenAddLabelModal}
                            openEditLabelModal={this.handleOpenEditLabelModal}
                            user={this.props.userData}
                        />
                    ) : 'Loading'
                }
                <MessageAlert
                    type="error"
                    contentText={error}
                    showDialog={showMessage}
                />
            </Layout>
        );
    }

    private handleCloseModal = () => {
        this.setState({
            openAddLabelModal: false,
            openEditLabelModal: false,
        });
    };

    private handleOpenAddLabelModal = () => {
        this.setState({
            openAddLabelModal: true,
        });
    };

    private handleOpenEditLabelModal = (key: string, value: string, scope: string) => {
        this.setState({
            openEditLabelModal: true,
            nameLabel: key,
            valueLabel: value,
            scopeLabel: scope,
        });
    };

    private userLogout = () => this.props.logout();

    private deleteLabel = (uid: string, key: string, scope: string) => {
        this.props.deleteLabel({uid: uid, key: key, scope: scope});
    };

    private changeNameForNewLabel = (value: string) => {
        this.setState({
            nameLabel: value,
        });
    };

    private changeValueForNewLabel = (value: string) => {
        this.setState({
            valueLabel: value,
        });
    };

    private changeScopeForNewLabel = (value: string) => {
        this.setState({
            scopeLabel: value,
        });
    };

    private addLabel = () => {
        const { nameLabel, valueLabel, scopeLabel } = this.state;
        const { uid } = this.props.userData;

        const requestProps = {
            key: nameLabel,
            value: valueLabel,
            scope: scopeLabel,
            uid: uid,
        };

        this.props.addNewLabel(requestProps);
        this.changeNameForNewLabel('');
        this.changeValueForNewLabel('');
    };

    private editLabel = () => {
        const { nameLabel, valueLabel, scopeLabel } = this.state;
        const { uid } = this.props.userData;

        const requestProps = {
            key: nameLabel,
            value: valueLabel,
            scope: scopeLabel,
            uid: uid,
        };

        this.props.editLabel(requestProps);
        this.changeNameForNewLabel('');
        this.changeValueForNewLabel('');
    };


    private changeState = (value: string) => {
        const { uid } = this.props.userData;
        this.props.changeUserState({uid: uid, state: value});
    };

    private changeRole = (value: string) => {
        const { uid } = this.props.userData;
        this.props.changeUserRole({uid: uid, role: value});
    };

    private changeOTP = (value: boolean) => {
        const { uid } = this.props.userData;
        this.props.changeUserOTP({uid: uid, otp: value});
    };

    private setError(newProp: string | undefined, oldProp: string | undefined) {
        if (newProp && (!oldProp)) {
            this.setState({
                error: newProp,
                showMessage: true,
            });
            setTimeout(() => {
                this.setState({
                    showMessage: false,
                })
            }, 2000);
        }
    };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        userData: selectUserData(state),
        errorAddLabel: selectAddLabelError(state),
        errorDeleteLabel: selectDeleteLabelError(state),
        errorEditLabel: selectEditLabelError(state),
        errorOTP: selectOTPError(state),
        errorRole: selectRoleError(state),
        errorState: selectStateError(state),
        
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        addNewLabel: payload => dispatch(addNewLabel(payload)),
        editLabel: payload => dispatch(editLabel(payload)),
        changeUserState: payload => dispatch(changeUserState(payload)),
        changeUserRole: payload => dispatch(changeUserRole(payload)),
        changeUserOTP: payload => dispatch(changeUserOTP(payload)),
        deleteLabel: (payload) => dispatch(deleteLabel(payload)),
        getUserData: payload => dispatch(getUserData(payload)),
        logout: () => dispatch(logout()),
    });

export const UserInfo = connect(mapStateToProps, mapDispatchToProps)(UserInfoScreen);