<!-- Please remove this file from your project -->
<template>
	<section class="p-5 bg-alert">
		<div class="container">
			<div class="row">
				<div class="col">
					<div class="mb-2">
						<h1>Welcome {{ user?.firstName }}</h1>
						<small class="text-muted">This is your settings page as read from the database, your changes here will be reflectd in the next day</small>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<div class="card card-body border-0 shadow-sm">
						<div class="d-flex flex-column">
							<div class="form-check form-switch py-2 ps-0 border-bottom">
								<label class="form-check-label" for="flexSwitchEnableBot">Bot Enabled ?</label>
								<div class="float-end">
									<CompsLoading v-if="configs.loading" />
									<input class="form-check-input" type="checkbox" v-model="configs.enabled" role="switch" id="flexSwitchEnableBot" />
								</div>
								
							</div>

							<div class="form-check form-switch py-2 ps-0">
								<label class="form-check-label" for="flexSwitchEnableAutoCheckIn">Auto Check In ?</label>
								<div class="float-end">
									<CompsLoading v-if="configs.checkins.loading" />
									<input class="form-check-input" type="checkbox" v-model="configs.checkins.enabled" role="switch" id="flexSwitchEnableAutoCheckIn" />
								</div>
								
							</div>

							<div class="venues">
								<div class="add_venue d-block">
									<div class="button_only mb-2 clearfix">
										<button 
										class="btn btn-sm btn-success float-end"
										type="button" 
										data-bs-toggle="collapse" 
										data-bs-target="#searchVenues"
										>Add Venue</button>
									</div>
									<div class="search_area">
										<div class="collapse" id="searchVenues">
											<div class="card card-body">
												<form class="d-flex">
													<div class="flex-grow-1">

														<input class="form-control" v-model="venue_search" list="venueOptions" id="inputVenueName" placeholder="Type to search...">
														<datalist id="venueOptions">
															<option value="San Francisco" />
															<option value="New York" />
															<option value="Seattle" />
															<option value="Los Angeles" />
															<option value="Chicago" />
														</datalist>

													</div>
													<div class="flex-shrink-0 ps-2">
														<button type="submit" class="btn btn-primary mb-3">Add</button>
													</div>
												</form>

											</div>
										</div>
									</div>

								</div>
								<div class="venues_list"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	data(){
		return {
			user: null,
			configs: {
				enabled: false,
				loading: true,
				checkins: {
					enabled: false,
					loading: true,
					venues: {},
				}
			},
			venue_search: '',
			bot_enabled_spinner: '',
			auto_check_in_enabled_spinner: '',
		}
	},
	mounted() {
		if(this.$auth.user?.user?.firstName){
			this.user = this.$auth.user.user;
		}

		console.log('before mutlaq expierment')
		this.$MFO_UTILS.setCheckInVenueInformation({id: 123})
		console.log("mounted");
		this.saveUser();
	},
	watch: {
		venue_search: async function(val){
			if(val.length != 0){
				//console.log(val);
				let venue_name = await this.$MFO_UTILS.searchVenues(val);
				console.log(venue_name[0]?.name);
			}
			
		},
        'configs.enabled': async function(val, oldVal) {
			this.bot_enabled_spinner = '';
			console.log(val);
			try {
				let toggle = await this.$MFO_UTILS.setBotStatus(val);
			} catch (error) {
				console.log(error)
			}

			this.bot_enabled_spinner = 'd-none';
        },
		'configs.checkins.enabled': async function(val, oldVal) {
			this.auto_check_in_enabled_spinner = '';
			console.log(val);
			try {
				let toggle = await this.$MFO_UTILS.setAutoCheckinStatus(val);
			} catch (error) {
				console.log(error)
			}

			this.auto_check_in_enabled_spinner = 'd-none';
        }
    },
	methods: {
		async saveUser() {
			//console.log(this.$auth.strategy.token.get());
			//console.log(this.$auth.user)
			//return;
			//console.log(await this.$fire.firestore.collection('users').get());
			const saveUser = await this.$MFO_UTILS.createUserInFirebase();

			// get user configs
			const userConfigs = await this.$MFO_UTILS.getConfigsFromFirebase();
			if(userConfigs){
				if(userConfigs?.enabled == true){
					this.configs.enabled = true;
				}

				if(userConfigs?.settings?.checkins?.enabled == true){
					this.configs.checkins.enabled = true;
				}

				this.configs.loading = false;
				this.configs.checkins.loading = false;
			}
			console.log(userConfigs)
			
		},
	},
};
</script>
