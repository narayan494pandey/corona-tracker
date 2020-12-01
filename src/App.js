import React,{Component}from 'react';
import './App.css';
import SearchBox from './component/SearchBox/SearchBox'
import CountryList from './component/CountryList/CountryList'

class App extends Component{
  constructor(){
    super();
    this.state = {
      countries:[],
      stats:[],
      searchField:""
    }
  }
 async componentDidMount(){
    const res = await fetch('https://api.covid19api.com/countries')
    const countries = await res.json()
    this.setState({countries})
    this.state.countries.forEach(async country =>{
      const res = await fetch(`https://api.covid19api.com/total/country/${country.Slug}`)
      const data = await res.json()
      if(data.length){
        this.setState(prevState =>(
          {stats: prevState.stats.concat({...data[data.length-1],CountryCode:country.ISO2})}
        ))  
      }     
  });
 }
 handleChange = (e) =>{
   e.preventDefault();
   this.setState({searchField:e.target.value})
 }
 render (){
   const {stats,searchField} = this.state
   const filteredCountries = stats.filter(country => country.Country.toLowerCase().includes(searchField.toLowerCase()))
   return(
        <div className="app">
        <SearchBox placeholder="Enter country name" handleChange={this.handleChange}/>
        <CountryList  stats={filteredCountries}/>
      </div>
   )
 }
}
export default App;
/*
<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.state.name}
          </a>
          <button onClick={()=> this.setState({name:'Delhi'})}>Change Name</button>
        </header>
        (e) => this.setState({searchField: e.target.value})
        */

