import {PrismaClient} from '@prisma/client'
import brcypt from 'bcrypt'
import { artistsData } from './songsData'

const prisma = new PrismaClient()

const run = async () => {
	await Promise.all(artistsData.map(async artist => {
		return prisma.artist.upsert({
			where: { name : artist.name },
			update: {},
			create: {
				name: artist.name,
				songs: {
					create: artist.songs.map(song => ({
							name: song.name,
							duration: song.duration,
							url: song.url,
					}))
				},
			},
		})
	}))

	const salt = brcypt.genSaltSync(10)
	const user = await prisma.user.upsert({
		where: { email: 'test@example.com' },
		update: {},
		create: {
			firstName: 'Pratik',
			lastName: 'Tamang',
			email: 'test@example.com',
			password: brcypt.hashSync('password', salt),
		},
	})

	const songs = await prisma.song.findMany({})
	await Promise.all(new Array(10).fill(1).map((_, i) => {
		return prisma.playlist.create({
			data: {
				name: `Playlist ${i}`,
				user: {
					connect: { id: user.id },
				},
				songs: {
					connect: songs.map(song => ({ id: song.id })),
				}
			}
		})
	}))
}

run ()
  .catch( e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
