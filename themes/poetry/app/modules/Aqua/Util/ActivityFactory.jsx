import Question from '../QuestionActivity/QuestionActivity.jsx';
import OrderList from '../OrderListActivity/OrderListActivity.jsx';
import PairActivity from '../PairsActivity/PairActivity.jsx';


const activities = { Question, OrderList, PairActivity };

export default function activityFactory (name) {
    return activities[name];
}