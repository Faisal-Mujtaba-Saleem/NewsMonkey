import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

import NewsItem from './NewsItem';
import Spinner from './Spinner';

const News = (props) => {

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState();
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const fetchNews = async (url) => {
        const fetchedNews = await fetch(url);
        const parsedNews = await fetchedNews.json();

        return { articles: parsedNews.articles, totalResults: parsedNews.totalResults };
    }

    const mountNews = async () => {
        props.setProgress(10);
        setLoading(true);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&language=en&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        const news = await fetchNews(url);
        setArticles(news.articles);
        setTotalResults(news.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${capitalize(props.category)} - NewsMonkey`;
        mountNews();
    }, [])


    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&language=en&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        const news = await fetchNews(url);
        setArticles(articles.concat(news.articles));
        setTotalResults(news.totalResults);
        setLoading(false);
    };

    return (
        <>
            <h2 className='text-center' style={{ margin: '6rem 0 2rem 0' }}>NewsMonkey - Top {capitalize(props.category)} Headlines</h2>
            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={page + 1 < Math.floor(totalResults / props.pageSize)}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {
                            articles.map((element, index) => {
                                return (
                                    <div key={element.title} className="col-md-4">
                                        {!loading && < NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} content={element.content} date={element.publishedAt} source={element.source.name} author={element.author} />}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}


News.defaultProps = {
    pageSize: 9,
    country: '',
    category: 'general'
}
News.propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string
}

export default News
