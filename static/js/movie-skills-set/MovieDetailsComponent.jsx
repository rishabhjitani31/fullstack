
class MovieDetailsComponent extends React.Component {

   constructor(props) {
      super(props);
		
      this.state = {
		
		//To set the state after add movie details button is clicked
        parentPanel:null,
		
		//To set the state of formdata
		formdata :{"movie_id":null,"movie_name":"","movie_url":"","movie_release_date":"","movie_genere":"","movie_lead_actor":"","movie_director":""},
		
		//To set the state after delete occurred
		deleteValue:null,
		
		//To set the state after update button is clicked
		addFormpanel:null,
		
		//To set the state of lead actorname details list
		leadactorname:null,
		
		//To set the state of directorname details list
		directorname:null
      }

    this.loadForm = this.loadForm.bind(this);
	this.handleParentChange = this.handleParentChange.bind(this);  
	this.handleTabChange = this.handleTabChange.bind(this);
   };

   //Will be called on clicking the add movie details button
   loadForm()
   {
		//Will set the state  of addFormpanel and rerenders it
		this.setState({addFormpanel:"true"});
   }
   
   //Will be called on clicking the update icon
   handleParentChange(e,f,g)
   {
		console.log(JSON.stringify(e));
		//will set the state of parentPanel and formdata
		this.setState({parentPanel:"true",formdata:e,leadactorname:f,directorname:g});
   }
   //will set the state of deleteValue
   handleTabChange()
   {
		this.setState({deleteValue:"true"});
   }
  
   render() {
	   
	   //Will render the Movieform component along with the details of existing movie set and hidevalue as prop to hide add button in the form
	   if (this.state.parentPanel == "true")
		{
		   return <MovieFormComponent formvalue ={this.state.formdata} hidevalue="hideadd" leadname = {this.state.leadactorname} directorname = {this.state.directorname}/>   
	    }
		
		//Will render MovieDetailsComponent after clicking delete button
		else if (this.state.deleteValue == "true")
		{
			return <MovieDetailsComponent />			
		}
		
		//Will render the MovieForm component along the null values and hidevalue as prop to hide update button in the form 
		else if (this.state.addFormpanel == "true")
		{
			return <MovieFormComponent formvalue ={this.state.formdata} hidevalue="hideupdate" leadname = {this.state.leadactorname} directorname ={this.state.directorname}/>   
		}
	  return (
        
        <div>
			{/*Will display add movie details button to the ui */}
			<button type="button" className="btn btn-primary adddetails" onClick={this.loadForm} >ADD Movie Details</button>
			{/*Will display the movie details in the ui in tabular form */}
			<MovieListComponent changeParent = {this.handleParentChange} changeTab ={this.handleTabChange}  />
		</div>	
	   );
   }
}

window.MovieDetailsComponent = MovieDetailsComponent;