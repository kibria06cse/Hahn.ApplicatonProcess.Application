using Hahn.ApplicatonProcess.May2020.Data.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.May2020.Domain.Countries.Queries
{
    public class GetAllCountriesQuery : IRequest<List<CountryDto>>
    {
        
    }
}
