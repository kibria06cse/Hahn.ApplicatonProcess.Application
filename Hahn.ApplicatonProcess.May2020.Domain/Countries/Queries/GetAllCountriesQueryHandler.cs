using Hahn.ApplicatonProcess.May2020.Data.Dtos;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.May2020.Domain.Countries.Queries
{
    public class GetAllCountriesQueryHandler : IRequestHandler<GetAllCountriesQuery, List<CountryDto>>
    {
        private readonly ILogger<GetAllCountriesQueryHandler> _logger;
        private readonly IConfiguration _configuration;

        public GetAllCountriesQueryHandler(ILogger<GetAllCountriesQueryHandler> logger, IConfiguration configuration)
        {
            this._logger = logger;
            this._configuration = configuration;
        }

        public async Task<List<CountryDto>> Handle(GetAllCountriesQuery request, CancellationToken cancellationToken)
        {
            var output = new List<CountryDto>();
            try
            {
                using (var client = new HttpClient())
                {
                    var url = _configuration.GetValue<string>("countryApi");

                    var result = await client.GetAsync(url);

                    var stringResult = await result.Content.ReadAsStringAsync();
                    output = JsonConvert.DeserializeObject<List<CountryDto>>(stringResult);
                }

                return output;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Unable to get country list from given Api. {ex.Message.ToString()}");
                throw ex;
            }
        }
    }
}
