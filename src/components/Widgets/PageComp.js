import React, { Component } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import API from '../../utils/API';


class PageComp extends Component {

	render() {

		return (

			<div className="pagination-container">
				<div className="paging">
					<div className="page-count">
						<span>
							Showing {1} of {10}
						</span>
					</div>
					<div className="page-numbers">
						<Pagination>
							<Pagination.First active />
							<Pagination.Prev />
							<Pagination.Next />
							<Pagination.Last />
						</Pagination>
					</div>
				</div>
			</div>
		);
	}

}
export default PageComp;