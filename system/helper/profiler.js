const database = require('../Database');
const fs = require('fs');
const ejs = require('ejs');

class Profiler{
    declarations(request, response, next){
        request.granpa = {};
        next();
    }
    fetchGetData(request, response, next){
        request.granpa.getData = request.query;
        next();
    }
    fetchPostData(request, response, next){
        request.granpa.postData = request.body;
        next();
    }
    fetchQueries(request, response, next){
        request.granpa.queries = database.queries;
        database.queries = [];
        next();
    }
    fetchSessions(request, response, next){
        request.granpa.sessions = request.session;
        next();
    }
    fetchMethod(request, response, next){
        request.granpa.method = request.method;
        next();
    }
    renderProfiler(request, response, next){
        fs.readFile('./system/helper/Profiler.ejs', function(err, data){
            if(err){
                return err;
            }

            const profilerData = request.granpa;
            const theProfiler = ejs.render(data.toString(), {profilerData});
            response.locals.renderProfiler = theProfiler;
            next();
        });
    }
}

let profiler = new Profiler;
module.exports = [
    profiler.declarations,
    profiler.fetchGetData,
    profiler.fetchPostData,
    profiler.fetchQueries,
    profiler.fetchSessions,
    profiler.fetchMethod,
    profiler.renderProfiler
];