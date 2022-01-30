import { makeStyles } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';


export default makeStyles((theme) => ({
  avatarIncome: {
    color: '#fff',
    backgroundColor: green[500],
  },
  avatarExpense: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
  },
  list: {
    maxHeight: '150px',
    overflow: 'auto',
  },
  listUpdated: {
    maxHeight: '150px',
    overflow: 'visible',
  },
  buttons: {
    marginRight: "5px"
  },
  item: {
    borderLeft: '2px solid rgb(17, 235, 151)'
  },
  itemUpdated: {
    borderLeft: 'none'
  },
  inputText: {
  padding: 0,
  border: 'none',
  outline: 'none',
  fontSize: "14px",
  lineHeight: '20px',
  height: '1rem'
  }
}));