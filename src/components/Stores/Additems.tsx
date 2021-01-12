import { Button, TextField } from "@material-ui/core";
import React from "react";
import firebase from "firebase";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Swal from "sweetalert2";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }),
);
class Additems extends React.Component<{},
    {
        values: any ,
        qty: any, 
        price: any, 
        storename: string,
        description: string,
        itemname: string,
        users: any,
        setUsers: any,
        mydata: any
    
    }>{
    constructor(props:any){
        super(props);
        this.state= {
                    mydata:[],
                    setUsers: '',
                    users: '',
                    values: '',
                    qty: "",
                    price: "",
                    storename: '',
                    description:'',
                    itemname: ''
                };
        this.handleSubmit       = this.handleSubmit.bind(this);
        this.handleQty          = this.handleQty.bind(this);
        this.handlePrice        = this.handlePrice.bind(this);
        this.handleStorename    = this.handleStorename.bind(this);
        this.handleDescription  = this.handleDescription.bind(this);
        this.handleItem         = this.handleItem.bind(this);
    }
    handleQty = (e: { target: { name: any; value: any; }; }) => {
    this.setState({...this.state, [e.target.name]: e.target.value})
    }
    handlePrice = (e: { target: { name: any; value: any; }; }) => {
    this.setState({...this.state, [e.target.name]: e.target.value})
    }
    handleStorename = (e: { target: { name: any; value: any; }; }) => {
    this.setState({...this.state, [e.target.name]: e.target.value})
    }
    handleDescription = (e: { target: { name: any; value: any; }; }) => {
    this.setState({...this.state, [e.target.name]: e.target.value})
    }
    handleItem = (e: { target: { name: any; value: any; }; }) => {
    this.setState({...this.state, [e.target.name]: e.target.value})
    }

    



    createUI(){
        return(
        // return this.state.values.map((el: any, i:any)=>
        <>
            <div style={{marginTop: '30px'}}>
            {/* <input type="text" value={el || ''} placeholder="item name" onChange={this.handleChange.bind(this, i)} /> */}
            <TextField type="text" variant="outlined" label="Store Name" name="storename" placeholder="Store Name" value={this.state.storename} onChange={this.handleStorename} required />
            <br>
            </br>
            <TextField type="text"  variant="outlined" label="Item Name" name="itemname" placeholder="Item Name" onChange={this.handleItem} style={{marginTop:'5px'}} required />
            <br>
            </br>
            <TextField type="number"  label="Qty" variant="outlined" name="qty" value={this.state.qty} onChange={this.handleQty} style={{marginTop:'5px'}} placeholder="Qty" required />
            <br>
            </br>
            <TextField type="number"  label="₱" variant="outlined" name="price" value={this.state.price} onChange={this.handlePrice} style={{marginTop:'5px'}} placeholder="Price" required />
            <br>
            </br>
            <TextField type="text" variant="outlined" label="Description" name="description" placeholder="Description" style={{marginTop:'5px'}} value={this.state.description} onChange={this.handleDescription} required />
            <br>
            </br>
            {/* <Button value="remove" variant="contained" color="secondary" style={{marginTop: '3px'}}  onClick={this.removeClick.bind(this, i)} >
                x
            </Button> */}
            {/* <input type="button" value="remove" onClick={this.removeClick.bind(this, i)} /> */}
            </div>
 
        </>
        )
        
    }

    handleChange(i:any, event:any){
        const values = [...this.state.values];
        values[i] = event.target.value;
        this.setState({ values });
    }
    addClick(){
        this.setState(prevState => ({ values: [...prevState.values, '']}))
    }
    removeClick(i: number){
        const values = [...this.state.values];
        values.splice(i,1);
        this.setState({values});
    }


    handleList(event: { preventDefault: () => void; }){
        event.preventDefault();
        // const {users} = this.state;
        // const [users, setUsers] = this.state<any>({});
        firebase
            .firestore()
            .collection("store_items")
            .orderBy("created_at", "desc")
            .onSnapshot(snapshot => {
                const listItems = snapshot.docs.map(doc =>({
                    id: doc.id,
                    ...doc.data()
                }));
                // users(listItems)
                console.log(">>>>>>", listItems)
            })

    }
    handleSubmit(){
        // alert('A name was submitted: ' + this.state.values.join(', '));
        // event.preventDefault();
        const db = firebase.firestore();
        db.collection('store_items').doc().set({
            item_name: this.state.itemname,
            storename: this.state.storename,
            qty: this.state.qty,
            price: this.state.price,
            description: this.state.description,
            created_at: new Date()
        })
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Submitted Successfully!',
            showConfirmButton: false,
            timer: 5000
          })

    }

    render() {
        return (
        <>  
        <Grid container spacing={3}>
            <Grid container item xs={12}>
                <Grid container>
                    <Grid item>
                        <form onSubmit={this.handleSubmit} >
                            {this.createUI()}    
                            {/* <input type='button' value='add more' onClick={this.addClick.bind(this)}/>
                            <input type="submit" value="Submit" /> */}

                            <div style={{marginTop: '10px'}}> 
                            {/* <Button  value='add more'  variant="contained" style={{color: 'white', backgroundColor: '#1d753b', margin: '5px'}} onClick={this.addClick.bind(this)} >
                            Add 
                            </Button> */}
                            <Button value="Submit" type="submit"  variant="contained" style={{color: 'white', backgroundColor: '#151e6e'}} color="secondary">
                            Add item
                            </Button>

                                </div>  
                        </form>
                        <form onSubmit={this.handleList}>
                          <input type="submit" value="Submit" />
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Grid container spacing={3}>
            <Grid container item xs={12}>
                 <Grid container>
                    <Grid item>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                    <th>store name</th>
                                    <th>Item name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* {
                                        Object.keys(users).map(id=>{
                                            return <tr>
                                                <td></td>
                                            </tr>
                                        })
                                    } */}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {/* <div>
                            <table>
                                <tr>
                                    <th>store name</th>
                                    <th>Item name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                </tr>
                                <tr>
                                    {/* {
                                        Object.keys(o).map(id=>{
                                            return <tr>
                                                
                                                <tr/>        
                                        })
                                    } */}
                                    
                                {/* </tr>
                            </table>
                        </div> */}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        </>
        );
      }
}

export default Additems;
