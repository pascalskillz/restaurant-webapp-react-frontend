import React, { Component } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import API from '../../utils/API';


class PageComp extends Component {

	state = {
		first: 1,


	};

	render() {

		return (
			<div className="pagination-container">
				<div className="paging">
					<div className="page-count">
						<span>
							Showing {1} of {10} Pages
						</span>
					</div>
					<div className="page-numbers">
						{/* <Pagination>
							<Pagination.First {this.handleFirst} />
							<Pagination.Prev {this.handlPrev} />
							<Pagination.Next {this.handleNext} />
							<Pagination.Last {this.handleLast} />
						</Pagination> */}
					</div>
				</div>
			</div>
		);
	}

}
export default PageComp;