import React from 'react';
import classNames from 'classnames';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import {
  createStyles,
  IconButton,
  Theme,
  Snackbar,
  WithStyles,
  withStyles,
} from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function IconContent(type: string, className: string) {
  switch (type) {
    case 'error':
      return <InfoIcon className={className}/>
    case 'info':
      return <ErrorIcon className={className} />
    case 'warning':
      return <InfoIcon className={className} />
    case 'success':
      return <CheckCircleIcon className={className} />
    default:
      return null;
  }
}

function getClassName(classes: any, type: string) {
  switch (type) {
    case 'error':
      return classes.error;
    case 'info':
      return classes.info;
    case 'warning':
      return classes.warning;
    case 'success':
      return classes.success;
    default:
      return '';
  }
}

interface StyleProps extends WithStyles<typeof styles> {
  theme: Theme;
}

interface OwnProps {
  contentText?: string;
  timeout?: number;
  showDialog: boolean;
  type: string;
}

type Props = StyleProps & OwnProps;

class MessageAlertComponent extends React.Component<Props> {
  state = {
    open: this.props.showDialog,
  };

  componentWillReceiveProps(next: Props) {
    if (next.showDialog && (!this.props.showDialog)) {
      this.setState({open: true});
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, type } = this.props;
    const contentText = this.props.contentText ? this.props.contentText : '';
    const timeout = this.props.timeout ? this.props.timeout : 2000;
    const className = getClassName(classes, type);
    return (
      <Snackbar
        className={className}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.open}
        autoHideDuration={timeout}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
          'className': className,
        }}
        message={<span className={classes.message}>{IconContent(type, classes.icon)} {contentText}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className="close"
            onClick={this.handleClose}
          >
            <CloseIcon className="icon" />
          </IconButton>,
        ]}
      />
    );
  }
}

export const MessageAlert = withStyles(styles, { withTheme: true })(MessageAlertComponent);
