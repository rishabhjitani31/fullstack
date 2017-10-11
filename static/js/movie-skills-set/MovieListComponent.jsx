class MovieListComponent extends React.Component
{
	 constructor(props)
	{
		super(props);
        this.state = {
			
			//handles the state of data obtained from ajax call
			data: null
			
       }
	   
	   //function to renders to formcomponent along with the details of existing movie 
	   this.handleUpdate = this.handleUpdate.bind(this);
	   
	   //function to open a pop box along with yes or no option 
	   this.handleDelete = this.handleDelete.bind(this);
	   
    };
	
	componentDidMount()
	{
			var that = this;
			var url = "/viewmoviedetails";
			$.ajax({
					method: "GET",
					url: url,
					success: function(data) 
					{
						console.log(JSON.stringify(data));
						//will set the the of data of all employee details
						that.setState({data:data['data']});	
						
					},
					error: function(XMLHttpRequest, textStatus, errorThrown)
					{ 
						console.log("textstatus:",textStatus);
						console.log("ErrorMessage:",errorThrown);
					}
					
				});
	
	}
	
	//used for pagination and sorting of records
	componentDidUpdate()
	{
		$('.tablechart').DataTable();
	}
	
	//will render back to parent component
	handleUpdate(e,f,g)
	{
		this.props.changeParent(e,f,g);
	}
	
	//used for handling delete button 
	handleDelete(id)
	{
		var that = this;
		bootbox.confirm({
		message: "Are you sure you want to delete the record",
		buttons: 
		{
			confirm: {
				label: 'Yes',
				className: 'btn-success'
			},
			cancel: {
				label: 'No',
				className: 'btn-danger'
			}
		},
		callback: function (result)
		{
			if (result == true) 
			{
				//ajax call along with employee_id as arguments for deleting the employee details
				var url = "/deleteemployeedetails?employee_id="+id;
				$.ajax({
					method: "DELETE",
					url: url,
					dataType:"json",
					cache:true,
					success: function(data) 
					{					
						if(data['status'] == "success")
						{	
							$.notify("Succesfully deleted the values from the database","success");
							that.props.changeTab()
						}
						else
						{
							$.notify("Failed to delete the value from database","error");
						}
					},
					error: function(XMLHttpRequest, textStatus, errorThrown)
					{ 
						console.log("textstatus:",textStatus);
						console.log("ErrorMessage:",errorThrown);
					}   
				});	
			}
			
		}
		});
	}
	
	
	render()
	{
		var head=[],row=[],values=[],totalValues=[],that=this;
		console.log(JSON.stringify(this.state.data));
		if(this.state.data==null)
		{
			return (<h4>Loading...</h4>);
		}
		//function to display headers 
		for (var i in this.state.data['headers'])
			{
				values.push(<th>{this.state.data['headers'][i]}</th>);
			}
			values.push(<th>Actions</th>);
			head.push(<tr>{values}</tr>);
			
		//function to display data along along with action button dynamically
		for(var value in this.state.data['response_data'])
		{      
			totalValues= [];
			for ( var j in this.state.data['headers']) 
			{
				var y=this.state.data['headers'][j]
				totalValues.push(<td>{that.state.data['response_data'][value][y]}</td>);
			}
			
			totalValues.push(<td>
								{that.state.data['response_data'].map(function(name,index)
								{
									if(value == index)
									{
										var y = that.state.data['response_data'][value];
										var z = that.state.data['response_data'][value]['employee_id'];
										return (
											<div>
											  <a href="#"onClick={()=>{that.handleUpdate(y,that.state.data['response_actor'],that.state.data['response_director'])}}><i className="fa fa-pencil fa-fw editstyle"></i></a>
											  <a href="#"onClick={()=>{that.handleDelete(z)}}><i className="fa fa-trash-o fa-fw deletestyle"></i></a>
											</div>
										);
									}
								})}
							</td>);
			row.push(<tr>{totalValues}</tr>);
		}
		
		//function that will display table chart 
		return (
		
				<table className ="tablechart table table-striped">
						<thead>
							{head}
						</thead>
						<tbody>
							{row}
						</tbody>
				</table>
				);
    }
}

window.MovieListComponent = MovieListComponent;
