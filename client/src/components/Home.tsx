import React from 'react';
import { useAuth0, LogoutOptions } from '@auth0/auth0-react';
import '@/components/style.css'
import "https://cdn.jsdelivr.net/npm/jquery@3.6.4/dist/jquery.min.js"
import "https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.5/dist/html2canvas.min.js"






function Home() {

    const { loginWithRedirect, logout } = useAuth0();


    window.document.onkeydown = function(e) {
        if (!e) {
            e = event;
        }
        if (e.keyCode == 27) {
            lightbox_close();
        }
    }

    function lightbox_open() {
        let lightBoxVideo = document.getElementById("VisaChipCardVideo");
        window.scrollTo(0, 0);
        document.getElementById('light')!.style.display = 'block';
        document.getElementById('fade')!.style.display = 'block';
        lightBoxVideo!.play();
    }

    function lightbox_close() {
        let lightBoxVideo = document.getElementById("VisaChipCardVideo");
        document.getElementById('light')!.style.display = 'none';
        document.getElementById('fade')!.style.display = 'none';
        lightBoxVideo!.pause();
    }

    return (
        <div>
<head>
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
          integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"/>

</head>

            <header>

                <div className="container">
                    <div className="intro-text">

                        <div className="intro-lead-in">Welcome</div>
                        <div className="intro-heading">EasyBI</div>
                        <h3>Project By Dhiya Eddine OUESLATI</h3>

                        <a  className="page-scroll btn btn-xl" onClick={() => loginWithRedirect()}>Explore Your DATA</a>
                    </div>
                </div>
            </header>


            <section id="services">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2 className="section-heading">Our Services</h2>
                            <h3 className="section-subheading text-muted">Discover the platform’s features</h3>
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-md-4">
                    <span className="fa-stack fa-4x">
                        <i className="fa fa-circle fa-stack-2x text-primary"></i>
                        <i className="glyphicon glyphicon-cloud-upload"></i>
                    </span>
                            <h4 className="service-heading">Upload</h4>
                            <p className="text-muted">Upload your data to our platform securely.</p>
                        </div>
                        <div className="col-md-4">
                    <span className="fa-stack fa-4x">
                        <i className="fa fa-circle fa-stack-2x text-primary"></i>
                        <i className="glyphicon glyphicon-blackboard"></i>
                    </span>
                            <h4 className="service-heading">Dashboard</h4>
                            <p className="text-muted">Visualize your data graphically using our charts and tables.</p>
                        </div>
                        <div className="col-md-4">
                    <span className="fa-stack fa-4x">
                        <i className="fa fa-circle fa-stack-2x text-primary"></i>
                        <i className="glyphicon glyphicon-stats"></i>
                    </span>
                            <h4 className="service-heading">Predictions</h4>
                            <p className="text-muted">The predictive function allows you to have predictions of your income and expenses for the next year.</p>
                        </div>
                    </div>
                </div>
            </section>


            <section id="portfolio" className="bg-light-gray">

                <div id="light">
                    <a className="boxclose" id="boxclose" onClick={lightbox_close}></a>
                    <iframe
                        src="https://player.vimeo.com/video/915777215?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                        width="700" height="400" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture"
                        title="Tutorial video"></iframe>
                </div>


                <div id="fade" onClick={lightbox_close}></div>

                <div><center>
                    <a href="https://download1582.mediafire.com/21y817f1a69gp09juvQqUv9F8-0vpSP4tCmoDGOF8CnHYRkyo2_965_BE-_Wz__fXF1y3RMxE9GW8pTRjYPjVwwFfaw4gwBEZTnitiWKZ79ioynkN8jtjx7VG5ZsZmOyjJqnJCdOLamZjX1zVoOoXCAbczZAgxrT2SPeGsKUC3K6/dtgaz4c97pq6t1j/data.js" className="page-scroll btn btn-xl" >Download a data example</a><br/><br/><br/>
                    <a href="#" className="page-scroll btn btn-xl" onClick={lightbox_open}>Watch a tutorial video</a>
                </center>
                </div>
            </section>


            <section id="about">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2 className="section-heading">Dedication</h2>
                            <h3 className="section-subheading text-muted">Thanks to ME for this **MASTERPIECE**.</h3>
                        </div>
                    </div>
                    <div className="row">

                    </div>
                </div>
            </section>


            <footer>


                    <center>
                        <div className="sociallogo">
                            <h3>Contact</h3>
                            <a href="https://facebook.com/dhiya.oueslati"><i className="fab fa-facebook fa-2x"></i></a>
                            <a href="instagram.com/dhiya.oueslati"><i className="fab fa-instagram fa-2x"></i></a>
                            <a href="twitter.com/dhiya.oueslati"><i className="fab fa-twitter fa-2x"></i></a>
                            <a href="linkedin.com/"><i className="fab fa-linkedin fa-2x"></i></a>


                            <h4>oueslati.dhiya.eddine@enig.u-gabes.tn</h4>

                                <h4> © Copyright Dhiya Eddine Oueslati - ENIG 2024</h4>
                        </div>



                    </center>

            </footer>


           </div>
    );
}

export default Home;
