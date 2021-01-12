import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, createStyles, Paper, Theme, withStyles } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    tblcenter: {
        alignContent: "center",
    },
    tableHead: {
     
      backgroundColor: '#09014a',
    }
  });

  
const StyledTableCell = withStyles((theme: Theme) =>
createStyles({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

const classes = useStyles();

function ItemTable() {
  return(
      <>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table" >
                <TableHead >
                <TableRow>
                    <StyledTableCell style={{color:'white',textAlign:'center'}}>First Name</StyledTableCell>
                    <StyledTableCell style={{color:'white',textAlign:'center'}}>Last Name</StyledTableCell>
                    <StyledTableCell style={{color:'white',textAlign:'center'}}>Address</StyledTableCell>
                    <StyledTableCell style={{color:'white',textAlign:'center'}}>Email Address</StyledTableCell>
                    <StyledTableCell style={{color:'white',textAlign:'center'}}>Contact</StyledTableCell>
                    <StyledTableCell style={{color:'white',textAlign:'center'}}>User Type</StyledTableCell>
                    <StyledTableCell style={{color:'white',textAlign:'center'}}>Status</StyledTableCell>
                    <StyledTableCell style={{color:'white',textAlign:'center'}}>Action</StyledTableCell>
                    <StyledTableCell></StyledTableCell>

                </TableRow>
                </TableHead>
                <TableBody>
                  
                </TableBody>
            </Table>
            </TableContainer>
      </>
  )
   
}

export default ItemTable;