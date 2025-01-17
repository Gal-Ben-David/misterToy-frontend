import React from "react";
import { StoreLocations } from "../cmps/StoreLocations.jsx";
import womanInWork from "../assets/img/about/woman-in-work.jpg";
import workFront from "../assets/img/about/work-front.jpg";
import wood from "../assets/img/about/wood.jpg";

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
            </section>

            <StoreLocations />
        </section>

    )
}