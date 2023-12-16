export default function News() {
    return (
        <div className="content news">
            <div>
                <h3>Blog With Sidebar Overview</h3>
                <ul>
                    <li>
                        <a href="blog-single-with-image.html"><img src="images/girl-and-boy.jpg" alt="" /></a>
                        <h4><a href="blog-single-with-image.html">Blog Post With Image</a></h4>
                        <div>
                            <span>Posted on <a href="#">June 14, 2023</a> in <a href="#">Furniture Management</a></span>
                            <span><a href="#">1 Comments</a></span>
                        </div>
                        <p>
                            This website template has been designed by Free Website Templates for you, for free. You can
                            replace all this text with your own text. You can remove any link to our website from this
                            website template...
                        </p>
                        <a href="blog-single-with-image.html">Read More</a>
                    </li>
                    <li>
                        <a href="blog-single-with-video.html"><img src="images/video-image.jpg" alt="" /></a>
                        <h4><a href="blog-single-with-video.html">Blog Post With Video</a></h4>
                        <div>
                            <span>Posted on <a href="#">June 14, 2023</a> in <a href="#">Maintenance and Cleaning</a></span>
                            <span><a href="#">0 Comments</a></span>
                        </div>
                        <p>
                            This website template has been designed by Free Website Templates for you, for free. You can
                            replace all this text with your own text. You can remove any link to our website from this
                            website template...
                        </p>
                        <a href="blog-single-with-video.html">Read More</a>
                    </li>
                </ul>
                <div class="paging">
                    <ul>
                        <li class="selected">
                            <a href="#">1</a>
                        </li>
                        <li>
                            <a href="#">2</a>
                        </li>
                        <li>
                            <a href="#">{'>'}</a>
                        </li>
                    </ul>
                    <span>Page 1 of 2</span>
                </div>
            </div>
        </div>
    );
}