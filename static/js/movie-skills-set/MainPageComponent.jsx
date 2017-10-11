class MainPageComponent extends React.Component
	{

		render()
		{
			var that = this;
			return (
			<div>
				<div className ="row" >	
					return(								
						<div className="col-sm-12">
							<div className="panel panel-default ">
								<div className="panel-heading">
									<h3 className="panel-title">{object.title}</h3>
								</div>
								<div className="panel-body">																					
									<MovieDetailsComponent />						  
								</div>
							</div>
						</div>
					  );
				</div>
			</div>
			);
		}
	}

window.MainPageComponent = MainPageComponent;