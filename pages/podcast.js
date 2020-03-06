import 'isomorphic-fetch'
import Link from 'next/link'
import PodCastGrid from '../components/PodCastGrid'
import Layout from '../components/Layout'

export default class extends React.Component {
	static async getInitialProps({ query }) {
		let idPod = query.id

		let reqPod = await fetch(`https://api.audioboom.com/audio_clips/${idPod}.mp3`)
		let clip = (await reqPod.json()).body.audio_clip

		return { clip }
	}
	render() {
		const { clip } = this.props
		return (
			<Layout title={ clip.title }>
				<PodCastGrid clip={ clip } />
			</Layout >
		)
	}
}
