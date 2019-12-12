import React, {Component} from 'react';
// Styles
import classesPageHome from '../../css/Pages/PageHome.css';
import classesPageCourses from '../../css/Pages/PageCourses.css';
import classesPageCourse from '../../css/Pages/PageCourse.css';
import classesPageSupport from '../../css/Pages/PageSupport.css';
// Components
import BlockHappyClients from '../components/Blocks/HappyClients';
import BlockAdvantages from '../components/Blocks/Advantages';
import BlockFeatures from '../components/Blocks/Features';
import BlockMotivation from '../components/Blocks/Motivation';
import BlockSlideshow from '../components/Blocks/Slideshow';
import BlockCourses from '../components/Blocks/Courses';
import BlockComplexChallenges from '../components/Blocks/ComplexChallenges';
import BlockAnyDevices from '../components/Blocks/AnyDevices';
import BlockBeginFreelans from '../components/Blocks/BeginFreelans';
import BlockAbout from '../components/Blocks/About';
import BlockContacts from '../components/Blocks/Contacts';
import BlockPolicy from '../components/Blocks/Policy';
import BlockPaymentAndReturns from '../components/Blocks/PaymentAndReturns';
import BlockCourse from '../components/Blocks/Course';
import BlockSupport from '../components/Blocks/Support';
import BlockDiscount from '../components/Blocks/Discount';
import BlockCart from '../components/Blocks/Cart';
import BlockThanks from '../components/Blocks/Thanks';

class PageSettings extends Component {
  state = {
    spinner: true,
    pagetitle: {
      conditions: {
        about: {classes: ['Reverse', 'About']},
        contacts: {classes: ['Contacts']},
        policy: {classes: ['Policy']},
        payment_and_returns: {classes: ['PaymentAndReturns']},
        support: {classes: ['Support']},
        discount: {classes: ['Discount']},
        cart: {classes: ['Cart']}
      }
    },
    blocks: {
      block_thanks: BlockThanks,
      block_cart: BlockCart,
      block_discount: BlockDiscount,
      block_payment_and_returns: BlockPaymentAndReturns,
      block_policy: BlockPolicy,
      block_slideshow: BlockSlideshow,
      block_motivation: BlockMotivation,
      block_advantages: BlockAdvantages,
      block_features: BlockFeatures,
      block_contacts: BlockContacts,
      block_complex_challenges: BlockComplexChallenges,
      block_any_devices: BlockAnyDevices,
      block_begin_freelans: BlockBeginFreelans,
      block_about: BlockAbout,
      block_support: BlockSupport,
      block_course: BlockCourse,
      block_courses: {
        type: 'entityCollection',
        component: BlockCourses,
        bundle: {
          conditions: {
            home: {
              classes: "Front",
              showName: true,
              showIntrotext: true 
            }
          },
          rules: {
            entity: 'products',
            fields: [
              'id',
              'alias', 
              'name', 
              'introtext',
              'duration',
              'salary',
              'price',
              'popular',
              'paymentConditions',
              'productPrices'
            ]
          }
        }
      },
      block_happy_clients: {
        component: BlockHappyClients,
        bundle: {
          conditions: {
            home: {
              classes: "Front"
            }
          }
        }
      }
    },
    styels: {
      home: [classesPageHome.PageHome, classesPageHome.Front],
      courses: classesPageCourses.PageCourses,
      course: classesPageCourse.PageCourse,
      support: classesPageSupport.PageSupport,
    }
  }

  intervalID = 0;

  componentDidMount () {
    clearInterval(this.intervalID);
    const fields = (this.props.hasOwnProperty('fields')) ? this.props.fields : [];

    if(this.props.page.data.filter(e => e.key === this.props.alias).length === 0){
      this.props.onFetchPage(this.props.alias, fields);

    }
    
    if(this.props.spinner === true && this.state.spinner === true){
      this.intervalID = setTimeout(() => {
        this.setState({spinner: false});
      }, 3000);
    }

    if(this.props.skipScroll !== true){
      window.scrollTo(0, 0);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
}
export default PageSettings;