import React from 'react';
import { Link } from 'react-router-dom';


export default function HomePage() {
    return (
        <div>
            <div>
                <h1>IronProfile</h1>
                <p>Today We will create an app with authoritation, adding some cool styles</p>
            </div>
            <div>
                <button>
                    <Link to="/signup">Signup</Link>
                </button>
                <button>
                    <Link to="/login">login</Link>
                </button>
            </div>
        </div>
    )
}
