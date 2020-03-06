import Link from 'next/link'
import slug from '../helpers/slug'
import PodcastPlayer from '../components/PodcastPlayer'

export default class ChannelGridChannel extends React.Component {
	constructor(props){
		super(props)
		this.state = { openPodcast: null }

	}
	openPodcast = (e, podcast) => {
		e.preventDefault()
		this.setState({
			openPodcast: podcast
		})
	}

	closePodcast = e => {
		e.preventDefault()
		this.setState({
			openPodcast: null
		})
	}

	render() {
		
		const { channel, audioClips, series } = this.props
		const { openPodcast } = this.state
		return (
			<>
				<div
					className='banner'
					style={{
						backgroundImage: `url(${channel.urls.banner_image.original})`,
					}}
				/>

					{ openPodcast && <div className="modal"><PodcastPlayer clip={openPodcast} onClose={ this.closePodcast } /></div>}

				<h1>{channel.title}</h1>

				{series.length > 0 && (
					<div>
						<h2>Series</h2>
						<div className='channels'>
							{series.map(serie => (
								<Link key={serie.id} href={`/channel?id=${serie.id}`} prefetch={false}>
									<a className='channel'>
										<img src={serie.urls.logo_image.original} alt='' />
										<h2>{serie.title}</h2>
									</a>
								</Link>
							))}
						</div>
					</div>
				)}

				<h2>Ultimos Podcasts</h2>
				{audioClips.map(clip => (
					<Link href={`/podcast?id=${clip.id}`} prefetch={false} key={clip.id}>
						<a className='podcast'
						   onClick={ e => this.openPodcast(e, clip) }
						   href={`/${slug(clip.channel.title)}.${clip.channel.id}
						   /${slug(clip.title)}.${clip.id}
						   `}  
						   >
							<h3>{clip.title}</h3>
							<div className='meta'>
								{Math.ceil(clip.duration / 60)} minutes
							</div>
						</a>
					</Link>
				))}

				<style jsx>{`
					header {
						color: #fff;
						background: #8756ca;
						padding: 15px;
						text-align: center;
					}

					.banner {
						width: 100%;
						padding-bottom: 25%;
						background-position: 50% 50%;
						background-size: cover;
						background-color: #aaa;
					}

					.channels {
						display: grid;
						grid-gap: 15px;
						padding: 15px;
						grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
					}
					a.channel {
						display: block;
						margin-bottom: 0.5em;
						color: #333;
						text-decoration: none;
					}
					.channel img {
						border-radius: 3px;
						box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
						width: 100%;
					}
					h1 {
						font-weight: 600;
						padding: 15px;
					}
					h2 {
						padding: 5px;
						font-size: 0.9em;
						font-weight: 600;
						margin: 0;
						text-align: center;
					}

					.podcast {
						display: block;
						text-decoration: none;
						color: #333;
						padding: 15px;
						border-bottom: 1px solid rgba(0, 0, 0, 0.2);
						cursor: pointer;
					}
					.podcast:hover {
						color: #000;
					}
					.podcast h3 {
						margin: 0;
					}
					.podcast .meta {
						color: #666;
						margin-top: 0.5em;
						font-size: 0.8em;
					}
					.modal {
						position: fixed;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						z-index: 99999;
						background: black;
					}
				`}</style>

				<style jsx global>{`
					body {
						margin: 0;
						font-family: system-ui;
						background: white;
					}
				`}</style>
			</>
		)
	}
}
