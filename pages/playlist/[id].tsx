import GradientLayout from "../../components/gradientLayout";
import SongTable from "../../components/songs";
import { validateToken } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

const getBGColor = (id) => {
	const colors = [
		"red",
		"orange",
		"yellow",
		"green",
		"blue",
		"purple",
		"teal",
		"gray",
	]
	 
	return colors[ id - 1 ] || colors[Math.floor(Math.random() * colors.length)];
}

const Playlist = ({ playlist }) => {
	const randomColor = getBGColor(playlist.id);
  return (
    <GradientLayout 
			color={`${randomColor}`} 
			subtitle="playlist" 
			title={playlist.name} 
			description={`${playlist.songs.length} songs`}
			image={`https://picsum.photos/400?random=${playlist.id}`}
			roundImage={false}	
		>
			<SongTable songs={playlist.songs}></SongTable>
		</GradientLayout>
		
  );
}

export const getServerSideProps = async ({ query, req }) => {
	let user

	try {
		user = validateToken(req.cookies.TRAX_ACCESS_TOKEN)
		
	} catch (error) {
		return {
			redirect: {
				permanent: false,
				destination: "/signin"
			}	
		}
	}

	const [playlist] = await prisma.playlist.findMany({
		where: {
			id: +query.id,
			userId: user.id
		},
		include: {
			songs : {
				include: {
					artist: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			},
		}
	})

	return {
		props: {
			playlist
		}
	}
}

export default Playlist