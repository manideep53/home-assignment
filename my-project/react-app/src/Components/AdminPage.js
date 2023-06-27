
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@atlaskit/button';
import DynamicTable from '@atlaskit/dynamic-table';
import 'bootstrap/dist/css/bootstrap.min.css';

import '@atlaskit/css-reset';




const AdminPage = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const username = 'admin';
  const password = 'admin';

  const fetchData = async () => {
    try {
      const response = await axios.get('/rest/api/2/project', {
        auth: {
          username,
          password,
        },
      });

      const projectData = await Promise.all(response.data.map(async (project, index) => {
        const countResponse = await axios.get(`/rest/api/2/search?jql=project=${project.key}&maxResults=0`, {
          auth: {
            username,
            password,
          },
        });

        return {
          id: project.id,
          key: project.key,
          name: project.name,
          issueCount: countResponse.data.total,
          serialNumber: index + 1,
        };
      }));

      setProjects(projectData);
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`/rest/api/2/project/${projectId}`, {
          auth: {
            username,
            password,
          },
        });

        fetchData();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = projects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const head = {
    cells: [
      {
        key: 'serialNumber',
        content: 'S.no',
      },
      {
        key: 'id',
        content: 'Project Id',
      },
      {
        key: 'key',
        content: 'Project Key',
      },
      {
        key: 'name',
        content: 'Project Name',
      },
      {
        key: 'issueCount',
        content: 'Issue Count',
      },
      {
        key: 'actions',
        content: 'Action',
      },
    ],
  };

  const rows = currentItems.map((project) => ({
    key: project.id,
    cells: [
      {
        key: 'serialNumber',
        content: project.serialNumber,
      },
      {
        key: 'id',
        content: project.id,
      },
      {
        key: 'key',
        content: project.key,
      },
      {
        key: 'name',
        content: project.name,
      },
      {
        key: 'issueCount',
        content: project.issueCount,
      },
      {
        key: 'actions',
        content: (
          <Button appearance="danger" onClick={() => handleDeleteProject(project.id)}>
            Delete
          </Button>
        ),
      },
    ],
  }));

  return (
    <div className="container mt-4" style={{ backgroundColor: 'ghostwhite' }}>
      <h1 className="text-center">Welcome to the Admin Page</h1>
      <br />
      <DynamicTable
        caption="Project Table"
        head={head}
        rows={rows}
        rowsPerPage={itemsPerPage}
        defaultPage={currentPage}
      />
      <div className="d-flex justify-content-center">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
           <Button
             key={pageNumber}
             appearance={pageNumber === currentPage ? 'primary' : 'default'}
             onClick={() => handlePageChange(pageNumber)}
            disabled={pageNumber === currentPage}
          >
            {pageNumber}
          </Button>
        ))}
      </div>
      <hr className="my-3" />
    </div>
  );
};

export default AdminPage;


