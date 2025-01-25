import React from 'react';

const Faq = () => {
    return (
        <div className="my-10 w-3/4 mx-auto  mt-14">
            <div>
                <h1 className='text-3xl text-center mb-5 font-bold'>FAQ</h1>
            </div>
            <div className="collapse collapse-arrow bg-base-200 dark:bg-gray-600">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-xl font-medium">
                    What is the purpose of the Mediflow application?
                </div>
                <div className="collapse-content">
                    <p>
                        Mediflow is designed to streamline medical camp management by connecting organizers and participants through a seamless platform. It simplifies event registrations, feedback, and analytics for better healthcare outreach.
                    </p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 dark:bg-gray-600">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    What key features does Mediflow offer?
                </div>
                <div className="collapse-content">
                    <p>
                        Mediflow includes features like user registration, camp listing, secure payment integration, feedback collection, analytics dashboards for organizers, and participant management tools.
                    </p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 dark:bg-gray-600">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    How does Mediflow handle participant feedback?
                </div>
                <div className="collapse-content">
                    <p>
                        Participants can submit feedback and ratings after attending a medical camp. This feedback is stored in the database and displayed in an analytics dashboard to help organizers improve future camps.
                    </p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 dark:bg-gray-600">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    How are payments and registrations managed in Mediflow?
                </div>
                <div className="collapse-content">
                    <p>
                        Mediflow uses secure payment gateways for camp registrations, ensuring a hassle-free experience for participants. Once payment is successful, participants receive confirmation and can access camp details.
                    </p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 dark:bg-gray-600">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    What technologies power Mediflow?
                </div>
                <div className="collapse-content">
                    <p>
                        Mediflow is built using ReactJS for the frontend, NodeJS and Express for the backend, and MongoDB for the database. Firebase Authentication handles user authentication, and payment integration is secured through Stripe.
                    </p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 dark:bg-gray-600">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    How does Mediflow assist organizers?
                </div>
                <div className="collapse-content">
                    <p>
                        Organizers can list their camps, track participant registrations, analyze feedback, and access real-time data through the analytics dashboard, making it easier to manage and optimize their events.
                    </p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 dark:bg-gray-600">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    How does Mediflow ensure data security?
                </div>
                <div className="collapse-content">
                    <p>
                        Data security is a priority in Mediflow. It uses Firebase Authentication for secure logins, encrypts sensitive payment information, and stores data in a secured MongoDB database with proper access controls.
                    </p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 dark:bg-gray-600">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    Can users track their registration and feedback history?
                </div>
                <div className="collapse-content">
                    <p>
                        Yes, participants can view their registered camps, payment status, and feedback submissions in their personalized dashboard, ensuring a smooth and transparent user experience.
                    </p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 dark:bg-gray-600">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    Are there plans for future updates in Mediflow?
                </div>
                <div className="collapse-content">
                    <p>
                        Future plans include adding AI-driven analytics for more personalized insights, multilingual support to cater to diverse audiences, and an option for organizers to host virtual medical camps.
                    </p>
                </div>
            </div>
        </div>

    );
};

export default Faq;