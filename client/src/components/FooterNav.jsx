import React from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as HomeIcon } from 'assets/svg/home.svg'
import { ReactComponent as QueueIcon } from 'assets/svg/queue.svg'
import { ReactComponent as SubscriptionIcon } from 'assets/svg/subscription.svg'
import { ReactComponent as DiscoverIcon } from 'assets/svg/discover.svg'

const FooterNav = () => {
  return (
    <section id="bottom-navigation" className="block fixed inset-x-0 bottom-0 z-10 bg-lime-500 shadow">
      <div className="footer-nav flex justify-between max-w-screen-lg lg:mx-auto">
        <NavLink to="/" exact={true} className="footer-nav__link w-full justify-center inline-block text-center pt-5 pb-5">
          <HomeIcon />
          <span className="block text-xs text-lime-700">home</span>
        </NavLink>
        <NavLink to="/queue" exact={true} className="footer-nav__link w-full text-lime-700 justify-center inline-block text-center pt-5 pb-5">
          <QueueIcon />
          <span className="block text-xs text-lime-700">play queue</span>
        </NavLink>
        <NavLink to="/subscriptions" exact={true} className="footer-nav__link w-full text-lime-700 justify-center inline-block text-center pt-5 pb-5">
          <SubscriptionIcon />
          <span className="block text-xs text-lime-700">subscriptions</span>
        </NavLink>
        <NavLink to="/discover" exact={true} className="footer-nav__link w-full text-lime-700 justify-center inline-block text-center pt-5 pb-5">
          <DiscoverIcon />
          <span className="block text-xs text-lime-700">discover</span>
        </NavLink>
      </div>
    </section>
  )
}

export default FooterNav