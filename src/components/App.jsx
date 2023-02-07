
import PhotoSearch from './PhotoSearch/PhotoSearch'
import styles from './App.module.css'

const App = () => {
    return(
        <div className={styles.App}>
        <PhotoSearch />
        </div>
    )
}

/*
class App extends Component {

    render() {
        return(
            <div className={styles.App}>
            <PhotoSearch />
            </div>
        )
    }
}
*/

export default App;