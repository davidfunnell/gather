import React from 'react';

class PresentationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            presenterName: '',
            presenterEmail: '',
            companyName: '',
            title: '',
            synopsis: '',
            conference: '',
            conferences: []
          };


        this.handlepresenterNameChange = this.handlepresenterNameChange.bind(this);
        this.handlepresenterEmailChange = this.handlepresenterEmailChange.bind(this);
        this.handlecompanyNameChange = this.handlecompanyNameChange.bind(this);
        this.handletitleChange = this.handletitleChange.bind(this);
        this.handlesynopsisChange = this.handlesynopsisChange.bind(this);
        this.handleconferenceChange = this.handleconferenceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.presenter_name = data.presenterName;
        delete data.presenterName;
        data.presenter_email = data.presenterEmail;
        delete data.presenterEmail;
        data.company_name = data.companyName;
        delete data.companyName;
        delete data.conferences;
        console.log(data);

        const locationUrl = `http://localhost:8000/api/conferences/${data.conference}/presentations/`;
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
          const newPresentation = await response.json();
          console.log(newPresentation);

          const cleared = {
            presenterName: '',
            presenterEmail: '',
            companyName: '',
            title: '',
            synopsis: '',
            conference: '',
          };
          this.setState(cleared);
        }
    }

    handlepresenterNameChange(event) {
        const value = event.target.value;
        this.setState({presenterName: value});
    }

    handlepresenterEmailChange(event) {
        const value = event.target.value;
        this.setState({presenterEmail: value});
    }

    handlecompanyNameChange(event) {
        const value = event.target.value;
        this.setState({companyName: value});
    }

    handletitleChange(event) {
        const value = event.target.value;
        this.setState({title: value});
    }

    handlesynopsisChange(event) {
        const value = event.target.value;
        this.setState({synopsis: value});
    }

    handleconferenceChange(event) {
        const value = event.target.value;
        this.setState({conference: value});
    }

    async componentDidMount() {
        const url = 'http://localhost:8000/api/conferences/';
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          this.setState({conferences: data.conferences});
        }
    }

  render() {
    return (
    <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new presentation</h1>
            <form onSubmit={this.handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input value={this.state.presenterName} onChange={this.handlepresenterNameChange} placeholder="Presenter name" required type="text" name="presenter_name" id="presenter_name" className="form-control"/>
                <label htmlFor="presenter_name">Presenter name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.presenterEmail} onChange={this.handlepresenterEmailChange} placeholder="Presenter email" required type="email" name="presenter_email" id="presenter_email" className="form-control"/>
                <label htmlFor="presenter_email">Presenter email</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.companyName} onChange={this.handlecompanyNameChange} placeholder="Company name" required type="text" name="company_name" id="company_name" className="form-control"/>
                <label htmlFor="company_name">Company name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.title} onChange={this.handletitleChange} placeholder="Title" required type="text" name="title" id="title" className="form-control"/>
                <label htmlFor="title">Title</label>
              </div>
              <div className="mb-3">
                <label htmlFor="synopsis" className="form-label">Synopsis</label>
                <textarea value={this.state.synopsis} onChange={this.handlesynopsisChange} className="form-control" name="synopsis" id="synopsis" rows="3"></textarea>
              </div>
              <div className="mb-3">
                <select value={this.state.conference} onChange={this.handleconferenceChange} required id="conference" name="conference" className="form-select">
                  <option value="">Choose a conference</option>
                  {this.state.conferences.map(conference =>{
                    return (
                        <option key={conference.id} value={conference.id}>
                            {conference.name}
                        </option>
                    );
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
    </div>
    );
  }
}

export default PresentationForm;
