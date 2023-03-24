declare module '@ioc:Adonis/Addons/Ally' {
	interface SocialProviders {
		github: {
			config: GithubDriverConfig
			implementation: GithubDriverContract
		}
	}
}
