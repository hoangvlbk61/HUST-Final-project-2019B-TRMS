import Overview from '../components/Overview'
import withData from '../lib/withData'
import { Card } from 'antd'
import { withAuthSync } from '../unities/auth'

const Home = withData(()=>{
    return (
        <Card>
            <Overview></Overview>
        </Card>
    )
})

export default withAuthSync(Home)
