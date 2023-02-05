import { Component } from 'react';
import './styles.css';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { loadPosts } from '../../utils/load-posts';
import { TextInput } from '../../components/TextInput';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 3,
    searchValue: "",
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts()
    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
     });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    
    this.setState({ posts, page: nextPage})
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value});
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePost = page + postsPerPage >= allPosts.length;

    const filtredPosts = !!searchValue ? 
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(
          searchValue.toLowerCase()
        );
      }) : posts;

    return (
      <section className='container'>
        <div className='search-container'>
          {!!searchValue && (
            <h1>Search in this file: {searchValue}</h1>
          )}
          
          <TextInput searchValue={searchValue} handleChange={this.handleChange} />
        </div>
        
        {filtredPosts.length > 0 && (
          <Posts posts={filtredPosts}></Posts>
        )}

        {filtredPosts.length === 0 && (
          <p>Não existem posts</p>
        )}  

        <div className='button-container'>
          {!searchValue && (
            <Button 
              onClick={this.loadMorePosts}
              disabled={noMorePost}
              text={'Load more posts'}
            />
          )}
        </div>
      </section>
    );
  }
}
