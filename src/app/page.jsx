import Advantage from '@/components/Advantage/Advantage'
import Animators from '@/components/Animators/Animators'
import Contacts from '@/components/Contacts/Contacts'
import Graduation from '@/components/Graduation/Graduation'
import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import LoftSpaces from '@/components/LoftSpaces/LoftSpaces'
import MasterClasses from '@/components/MasterClasses/MasterClasses'
import NewYear from '@/components/NewYear/NewYear'
import Quests from '@/components/Quests/Quests'
import Reviews from '@/components/Reviews/Reviews'
import ShowPrograms from '@/components/ShowPrograms/ShowPrograms'

export default function Home() {
	return (
		<>
			<Header />
			<Hero />
			{/* <VideoSection /> */}
			<LoftSpaces />
			<Advantage />
			<Animators />
			<ShowPrograms />
			<Quests />
			<MasterClasses />
			<NewYear />
			<Graduation />
			<Reviews />
			<Contacts />
		</>
	)
}
