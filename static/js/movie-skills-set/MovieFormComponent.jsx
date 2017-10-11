class MovieFormComponent extends React.Component
	{

		constructor(props)
		{
			super(props);
			this.state = 
			{
					//handles the state of id
					id: this.props.formvalue['movie_id'] ,
					
					//handles the state of moviename
					moviename: this.props.formvalue['movie_name'] ,
					
					//handles the state of movieurl
					movieurl: this.props.formvalue['movie_url'] ,
					
					//handles the state of moviereleasedate
					moviereleasedate: this.props.formvalue['movie_release_date'] ,
					
					//handles the state of moviegenre
					moviegenere: this.props.formvalue['movie_genere'] ,
					
					//handles the state of movieleadactor
					movieleadactor: this.props.formvalue['movie_lead_actor'] ,
					
					//handles the state of moviedirector
					moviedirector: this.props.formvalue['movie_director'] ,
					
					
					//handles the state to render back to  movie details component
					listMessage:null
			}
			
			//function to set the state of id on change on change of value
			this.handleIDChange = this.handleIDChange.bind(this);
			
			//function to set the state of moviename on change of value
			this.handleMovieNameChange = this.handleMovieNameChange.bind(this);
			
			//function to set the state of movieurl on change of value
			this.handleMovieURLChange = this.handleMovieURLChange.bind(this);
			
			//function to set the state of moviereleasedate on change of value
			this.handleReleaseDateChange = this.handleReleaseDateChange.bind(this);	

			//function to set the state of moviegenere on change of value
			this.handleGenereChange = this.handleGenereChange.bind(this);
			
			//function to set the state of movieleadactor on change of value
			this.handleLeadActorChange = this.handleLeadActorChange.bind(this);
			
			//function to set the state of moviedirector on change of value
			this.handleDirectorChange = this.handleDirectorChange.bind(this);
			
			//function to handle onclick of submit button
			this.handleSubmitLink = this.handleSubmitLink.bind(this);
			
			//function to handle onclick of cancel button
			this.handleCancelLink = this.handleCancelLink.bind(this);
			
			//function to handle onclick of update button
			this.handleUpdateLink = this.handleUpdateLink.bind(this);
		};
		
		//function which will set the state of id
		handleIDChange(e)
		{
			this.setState({id:e.target.value});
		}
		
		//function which will set the state of moviename
		handleMovieNameChange(e)
		{
			this.setState({moviename:e.target.value});
		}
		
		//function which will set the state the of movieurl
		handleMovieURLChange(e)
		{
			this.setState({movieurl:e.target.value});
		}
		
		//function which will set the state of moviereleasedate
		handleReleaseDateChange(e)
		{
			this.setState({moviereleasedate:e.target.value});
		}
		
		//function which will set the state of moviegenere
		handleGenereChange(e)
		{
			this.setState({moviegenere:e.target.value});
		}
		
		//function which will set the state of movieleadactor
		handleLeadActorChange(e)
		{
			this.setState({movieleadactor:e.target.value})
		}
		
		//function which will set the state of moviedirector
		handleDirectorChange(e)
		{
			this.setState({moviedirector:e.target.value})
		}
		
		//function which will handles submit button and sends the added data to backend
		handleSubmitLink(e)
		{
			e.preventDefault();
			var that = this;
			var url = "/addmoviedetails?movie_id="+that.state.id+"&movie_name="+that.state.moviename+"&movie_url="+that.state.movieurl+"&movie_release_date="+that.state.moviereleasedate+"&movie_genere="+that.state.moviegenere+"&movie_director="+that.state.moviedirector+"&movie_lead_actor="+that.state.movieleadactor;
			$.ajax({
				method: "POST",
				url: url,
				dataType:"json",
				cache:true,
				success: function(data) 
				{					
					if(data['reason'] == "Valid Data")
					{	
						$.notify("Succesfully added the entered details to the database ","success");
					}
					if(data['reason'] == "Duplicate Data")
					{
						$.notify("Failure,Enter unique movie id","error");
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown)
				{ 
					console.log("textstatus:",textStatus);
					console.log("ErrorMessage:",errorThrown);
				}   
			});	
			
			this.setState({listMessage:"true"});
					
		
		}
		
		//function which handles onclick of cancel button
		handleCancelLink(e)
		{
			e.preventDefault();
			this.setState({listMessage:"true"});
		}
		
		//function which handle update button and sends updated data to backend
		handleUpdateLink(e)
		{
			e.preventDefault();
			var that = this;
			var x = that.state.id.toString().length;
			
			var url = "/updatemoviedetails?movie_id="+that.state.id+"&movie_name="+that.state.moviename+"&movie_url="+that.state.movieurl+"&movie_release_date="+that.state.moviereleasedate+"&movie_genere="+that.state.moviegenere+"&movie_director="+that.state.moviedirector+"&movie_lead_actor="+that.state.movieleadactor;
			$.ajax({
				method: "PUT",
				url: url,
				dataType:"json",
				cache:true,
				success: function(data) 
				{					
					if(data['status'] == "success")
					{	
						$.notify("Succesfully updated the values of database ","success");
					}
					else
					{
						$.notify("Enter unique movie id","error");
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown)
				{ 
					console.log("textstatus:",textStatus);
					console.log("ErrorMessage:",errorThrown);
				}   
			});	
			
			this.setState({listMessage:"true"});
			
		}
		
		//function which will call after first render 
		componentDidMount()
		{
			//hides the update button on onclick of add movie details
			if(this.props.hidevalue == "hideupdate")
			{
				$("#Update").hide();
			}
			//hides the add button on onclick of update movie details
			if(this.props.hidevalue == "hideadd")
			{
				$("#Submit").hide();
			}
		}
		render()
		{
			//renders to MovieDetailsComponent
			var that = this;
			if(this.state.listMessage == "true")
			{
				return <MovieDetailsComponent />;
			}
			
			//returns form which will be displayed in the ui
			return (
					
					<form>
					
						<div className="form-group">
							<label for="ID">Movie ID:</label>
								<input type="number" className="form-control" value={this.state.id} id="ID" placeholder="Enter only integer value"  onChange={this.handleIDChange} />
						</div>
						
						<div className="form-group">
							<label for="moviename">Movie Name:</label>
							<input type="text" className="form-control" value={this.state.moviename} id="moviename" placeholder="Enter in text" onChange={this.handleFirstNameChange}/>
						</div>
						
						<div className="form-group">
							<label for="movieurl">Movie URL:</label>
								<input type="text" className="form-control" value={this.state.movieurl} id="movieurl" placeholder="Enter in text" onChange={this.handleLastNameChange}/>
						</div>
						
						<div className="form-group">
							<label for="releasedate">Movie Release date:</label>
								<input type="text" className="form-control" value={this.state.moviereleasedate} id="releasedate" placeholder="Enter in text" onChange={this.handleDesignationChange}/>
						</div>
						
						<div className="form-group">
							<label for="moviegenere">Movie Genere:</label>
								<input type="text" className="form-control" value={this.state.moviegenere} placeholder="Enter in text"  id="moviegenere" onChange={this.handleExperienceChange}/>
						</div>
						
						<div className="form-group">
							<label for="movieleadactor">Movie LeadActor:</label>
								<input type="text" className="form-control" value={this.state.movieleadactor} placeholder="Enter in text"  id="movieleadactor" onChange={this.handleExperienceChange}/>
								{that.props.leadname.map((item, index) => (
									<option value={that.props.leadname}>{that.props.leadname}</option>
								))}
						</div>
						
						<div className="form-group">
							<label for="moviedirector">Movie Director:</label>
								<input type="text" className="form-control" value={this.state.moviedirector} placeholder="Enter in text"  id="moviedirector" onChange={this.handleExperienceChange}/>
								{that.props.leadname.map((item, index) => (
									<option value={that.props.directorname}>{that.props.directorname}</option>
								))}
						</div>
											
						<div class="form-group">
							<button type="submit" className="btn btn-success" id="Submit" onClick={this.handleSubmitLink}>Submit and Back</button>&nbsp;
							<button type="submit" className="btn btn-success" id="Update" onClick={this.handleUpdateLink}>Update and Back</button>&nbsp;
							<button type="submit" className="btn btn-danger" id="Cancel" onClick={this.handleCancelLink}>Cancel</button>&nbsp;
						</div>
											
					</form>
			);
		}
	}
	

window.MovieFormComponent = MovieFormComponent;