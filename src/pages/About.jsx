import React from "react";
import { StoreLocations } from "../cmps/StoreLocations.jsx";
import womanInWork from "../assets/img/about/woman-in-work.jpg"; // adjust the path as necessary
import workFront from "../assets/img/about/work-front.jpg"; // adjust the path as necessary
import wood from "../assets/img/about/wood.jpg"; // adjust the path as necessary

export function About() {

    return (

        <section className="about">
            <section className="description-story">
                <div className="part-of-story">
                    <div>
                        <div>
                            <h4>Our Workshop: A Labor of Love 🫶🏽</h4>
                            <p>Nestled in a cozy corner of Moshav Udim, our workshop is where the magic happens. It's a space filled with creativity and inspiration, where skilled artisans pour their hearts into every piece they create.</p>
                        </div>
                        <div>
                            <h4>Craftsmanship at Its Finest</h4>
                            <p>With wooden planks sourced from sustainable forests, each toy is meticulously shaped, sanded, and finished to ensure it meets our high standards of quality and safety. Our artisans use traditional techniques combined with a modern touch to bring each design to life.</p>
                        </div>
                    </div>
                    <div>
                        <img src={womanInWork} />
                    </div>
                </div>

                <div className="part-of-story">
                    <div>
                        <div>
                            <h4>A Welcoming Atmosphere</h4>
                            <p>The moment you step into our facility, you'll feel the warmth and passion that drives us. The scent of fresh wood, the sound of tools at work, and the laughter of our team create an environment that embodies our commitment to craftsmanship and community.</p>
                        </div>
                        <div>
                            <h4>Behind Every Toy</h4>
                            <p>Every teddy bear and wooden toy has a story, and our workshop is where those stories begin. We take pride in creating toys that not only bring joy but also encourage play, learning, and imagination.</p>
                        </div>
                        <div>
                            <h4>Join Our Family</h4>
                            <p>When you choose MisterToy, you're not just purchasing a toy; you're becoming part of our family. We invite you to explore our store and discover the perfect companion for your child. Thank you for supporting handmade, sustainable products that encourage imaginative play!</p>
                        </div>
                    </div>
                    <div>
                        <img src={workFront} />
                    </div>
                </div>

                <div>
                    <div>
                        <img />
                    </div>

                </div>

            </section>

            <StoreLocations />
        </section>

    )
}

{/* <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100" src={womanInWork} alt="First slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={workFront} alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={wood} alt="Third slide" />
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div> */}