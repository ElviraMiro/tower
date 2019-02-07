import React from 'react';
import {
  createStyles,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Theme,
  Slide,
  WithStyles,
  withStyles,
} from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
  },
  form: {
      width: '100%',
      marginTop: theme.spacing.unit,
  },
  submit: {
      marginTop: theme.spacing.unit * 3,
      backgroundColor: "#3598D5",
      color: "#ffffff",
  },
});

function Transition(props: any) {
  return <Slide direction="down" {...props} />;
}

function Title(props: any) {
  return (
    <DialogTitle id="alert-dialog-slide-title">
      {props.title}
    </DialogTitle>)
}

interface StyleProps extends WithStyles<typeof styles> {
  theme: Theme;
}

interface OwnProps {
  title?: string;
  contentText?: string;
  timeout?: number;
  showDialog: boolean;
}

type Props = StyleProps & OwnProps;

class MessageAlertComponent extends React.Component<Props> {
  state = {
    open: this.props.showDialog,
  };

  componentWillReceiveProps(next: Props) {
    if (next.showDialog) {
      const timeout = next.timeout ? next.timeout : 1000;
      this.setState({open: true});
      setTimeout(() => {
        this.setState({ open: false });
      }, timeout);
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { contentText, title } = this.props;
    return (
      <div>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          {title ? Title(this.props) : null}
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {contentText}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export const MessageAlert = withStyles(styles, { withTheme: true })(MessageAlertComponent);
