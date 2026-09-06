import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
	return <main className="login-shell">
		<section className="login-panel">
			<div className="login-content">
				<header className="login-brand"><span className="font-display text-2xl font-bold tracking-tight">Drive<span className="text-moss">Rent</span><span className="ml-1 text-lime">.</span></span><span className="login-brand-note">DRIVERENT / 01</span></header>
				<div className="login-copy"><p className="eyebrow">Welcome back</p><h1 className="font-display">Keep moving.</h1><p>Sign in to manage your journeys with DriveRent.</p></div>
				<LoginForm />
				<p className="login-footer">Your journey starts with a single sign in.</p>
			</div>
		</section>
		<section className="login-visual" aria-label="DriveRent journey preview">
			<div className="login-orb login-orb-one" /><div className="login-orb login-orb-two" />
			<div className="visual-topline"><span>THE OPEN ROAD</span><span>12.9716° N / 77.5946° E</span></div>
			<div className="visual-copy"><p className="eyebrow text-lime">A better way to go</p><h2 className="font-display">Leave room<br /><em>for the unexpected.</em></h2><p>Premium cars, clear pricing, and a little more freedom in every mile.</p></div>
			<svg className="route-map" viewBox="0 0 700 450" role="img" aria-label="Animated route with a moving car">
				<path className="route-shadow" d="M-30 410 C130 280 160 390 270 290 S430 60 730 120" />
				<path className="route-line" d="M-30 410 C130 280 160 390 270 290 S430 60 730 120" />
				<g className="route-car"><rect x="-17" y="-7" width="34" height="14" rx="5" /><path d="M-9 -7l5 -8h9l5 8" /><circle cx="-10" cy="8" r="4" /><circle cx="10" cy="8" r="4" /></g>
			</svg>
			<div className="visual-stats"><div><strong>2,400<span>+</span></strong><small>cars available</small></div><div><strong>180</strong><small>cities covered</small></div><div><strong>24/7</strong><small>human support</small></div></div>
		</section>
	</main>;
}
