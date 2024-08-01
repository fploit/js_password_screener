// Section structure
import Section 		from '../../structure/section';
import Container 	from '../../structure/container';

// Specing util
import Spacing 		from '../../utils/spacing.util';

// Section general blocks
import SectionGridBg from '../../blocks/section.grid.block'
import SectionTitle from '../../blocks/section.title.block'

// Section scss
import looking 		from '../../../styles/sections/index/looking.module.scss';
import section 		from '../../../styles/blocks/section.title.module.scss'

/**
 * Section: Looking
 * Declare your employment intentions 🚀
 * 
 * @returns {jsx} <Looking />
 */
export default function Looking() {
	return (
		<Section classProp={`${looking.section} borderBottom`}>	
			<Container classProp={`${section.title} ${looking.container}`} spacing={['verticalXXXLrg']}>
				<h4>We have a lot of this kind of information.</h4>
				<h2 className={looking.json}>Data : &#123;</h2>
				<h2 className={looking.jsonSub}><span className={looking.highlight}>Website Address</span>,</h2>
				<h2 className={looking.jsonSub}><span className={looking.highlight2}>Username and Password</span></h2>
				<h2 className={looking.json}>&#125;</h2>
				<h4>You see the link of your desired site and we give you the information we have from that link.</h4>
				{/* <h2>Senior <span className={looking.highlight}>User Experience</span> Designer</h2>
				<p className="subtitle">with a focus on Product Design.</p> */}
			</Container>
		</Section>
	)
}