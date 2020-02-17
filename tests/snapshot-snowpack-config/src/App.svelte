<script>
    import { Router, Link, Route } from 'svelte-routing';
    import Home from './routes/Home';
    import About from './routes/About';
</script>

<Router url="">
    <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
    </nav>
    <div>
        <Route path="/about">
            <About />
        </Route>
        <Route path="/">
            <Home />
        </Route>
    </div>
</Router>
