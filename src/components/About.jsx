import React from 'react'

export default function About() {
    return (
        <div>
            <div className="about-margin">
                <div style={{padding: "7px"}}>
                    <div>
                        <h2 style={{color: "#80352d"}}>About</h2>
                    </div>
                </div>                    
            </div>
            <div className="about-margin">
                <div style={{padding: "7px"}}>
                    <p>
                        Sigma Forum is a dynamic mathematics learning tool and community, 
                        targeted towards upper secondary and University students and educators. We provide
                        high level maths question generation, incorporating interactive visual aids.
                    </p>
                    <p>
                        Sigma Forum creates a fun, community orientated environment, helping to foster
                        a students passion for mathematics as well as facilitate their ambition to learn.
                        Our trademark forum allows for unique collaboration opportunities between students,
                        whether that be discussing mathematics concepts that spark their interests or
                        or asking for help with challening problems.

                    </p>
                    <div style= {{display: "flex", alignItems: "center", justifyContent: "center", padding: "20px"}}>
                        <img
                        src= "http://www.sciencefriday.com/wp-content/uploads/2016/08/Artboard-1.png"
                        alt= "Math"
                        width= "300px"
                        />
                    </div>                    
                </div>                
            </div>            
        </div>
    )
}
