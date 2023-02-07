
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader'
import SearchList from "./SearchList/SearchList";
import Searchbar from './Searchbar/Searchbar'
import Modal from "components/Modal/Modal";
import { searchImages } from "components/Api/Api";
import ButtonLoad from "components/ButtonLoad/ButtonLoad";


const PhotoSearch = () => {
    const [search, setSearch] = useState('');
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);

    useEffect(() => {
        const fetchPictures = async() => {
            try {
                setIsLoading(true)
    
                const hits = await searchImages(search, page);
    
                if (hits.length === 0) {
                    setIsLoading(false)
                    alert('Sorry, there are no available images. Please try again.');
                }
                setItems(prevItems => ([...prevItems, ...hits]))
            } catch (error) {
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
        }
        search && fetchPictures();
    }, [search, page, setItems, setIsLoading, setError]);

    const onSearchImages = ({search}) => {
        setSearch(search);
        setItems([]);
        setPage(1);
    }
    const showPicture = img => {
        setCurrentImage(img)
    }
    const closeModal = () => {
        setCurrentImage(null)
    };




    //vwiloiwbvo2ebvjbioqvwbeionojvbq3bvn32oibviobeiowboiwbhe




    const loadMore = () => {
        setPage(page + 1)
    }
        return (
            <>
                <Searchbar onSubmit={onSearchImages} />
                {items.length>0 && <SearchList items={items} showPicture={showPicture} />}
                {error && <p>{error}</p>}
                {isLoading && <Loader />}
                {!isLoading && Boolean(items.length) ? <ButtonLoad loadMore={loadMore} /> : ''}
                {currentImage && (
                    <Modal currentImage={currentImage} closeModal={closeModal} />
                )}
            </>
        )
}

/*
class PhotoSearch extends Component {
    state = {
        serach: '',
        items: [],
        isLoading: false,
        error: null,
        page: 1,
        currentImage: null,
    }

    componentDidUpdate(prevProps, prevState) {
        const { search, page } = this.state;
        if (prevState.search !== search || prevState.page !== page) {
            this.fetchPictures();

            // this.setState({ isLoading: true })
            //     searchImages(search, page)
            //     .then(({ data }) => this.setState(({ items }) => ({items: [...items, ...data]})))
            //     .catch((error) => this.setState({ error: error.message }))
            //     .finally(() => this.setState({ isLoading: false }))
        }
    }

    async fetchPictures() {
        try {
            this.setState({ isLoading: true });
            const { search, page } = this.state;

            const hits = await searchImages(search, page);

            if (hits.length === 0) {
                this.setState({ isLoading: false })
                alert('Sorry, there are no available images. Please try again.');
            }

            this.setState(({ items }) => ({
                items: [...items, ...hits],
            }));
        } catch (error) {
            this.setState({ error: error.message });
        } finally {
            this.setState({ isLoading: false });
        }
    }


    searchImages = ({ search }) => {
        this.setState({ search, items: [], page: 1 })
    }
    showPicture = img => {
        this.setState({
            currentImage: img
        })
    }
    closeModal = () => {
        this.setState({ currentImage: null });
    };

    loadMore = () => {
        this.setState(({ page }) => ({ page: page + 1 }))
    }


    render() {
        const { items, isLoading, error, currentImage } = this.state;
        const { searchImages, showPicture, loadMore, closeModal } = this;
        return (
            <>
                <Searchbar onSubmit={searchImages} />
                {items.length>0 && <SearchList items={items} showPicture={showPicture} />}
                {error && <p>{error}</p>}
                {isLoading && <Loader />}
                {!isLoading && Boolean(items.length) ? <ButtonLoad loadMore={loadMore} /> : ''}
                {Boolean(items.length) && <ButtonLoad loadMore={loadMore} />}
                {currentImage && (
                    <Modal currentImage={currentImage} closeModal={closeModal} />
                )}
            </>
        )
    }
}
*/

export default PhotoSearch;