import Link from 'next/link'
import Layout from '../components/Layout'
import ChannelGridChannel from '../components/ChannelGridChannel'
import Error from 'next/error'

export default class extends React.Component {
	
	

	static async getInitialProps({ query, res }) {
		try {
			let idChannel = query.id
	
			let [reqChannel, reqSeries, reqAudio] = await Promise.all([
				fetch(`https://api.audioboom.com/channels/${idChannel}`),
				fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`),
				fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
			])

			if( reqChannel.status >= 400){
				res.statusCode = reqChannel.status
		    	return { channel:null, audio_clips:null, series:null, statusCode: 404 }
			}
	
			let dataChannel = await reqChannel.json()
			let channel = dataChannel.body.channel
	
			let dataAudios = await reqAudio.json()
			let audioClips = dataAudios.body.audio_clips
	
			let dataSeries = await reqSeries.json()
			let series = dataSeries.body.channels
	
			return { channel, audioClips, series, statusCode: 200 }
		} catch (e) {
			res.statusCode = 503
			return { channel:null, audio_clips:null, series:null, statusCode:503 }
		}
	}

	

	render() {
		const { channel, audioClips, series, statusCode } = this.props
		

		if( statusCode !== 200 ){
			return <Error statusCode= { statusCode } />
		}

		return (
			<Layout title={ channel.title }>
				<ChannelGridChannel   channel={ channel } audioClips={ audioClips} series={ series }/>
			</ Layout>
		)
	}
}
